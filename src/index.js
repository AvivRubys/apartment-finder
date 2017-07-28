const os = require('os');
const geolib = require('geolib');
const moment = require('moment');
const _ = require('lodash');
const co = require('co');

const fetcher = require('./fetcher');
const dispatcher = require('./dispatcher');
const {EnhancedAd, parseAds} = require('./ad-parser');
const adsRepository = require('./ads-repository');
const management = require('./management');
const Stats = require('./stats');

const query = require('../config/query');

const log = message => console.log('[' + moment().format('HH:mm') + '] ' + message);

function filterByAndAddMatchingAreas(ad) {
    const matchingAreas = _.chain(query.areas)
        .defaultTo([])
        .filter(area => geolib.isPointInside(ad.coordinates, area.points))
        .flatMap(area => area.labels)
        .value();
    
    ad.addTags(...matchingAreas);

    return matchingAreas.length > 0;
}

function filterByAndAddMatchingDate(ad) {
    const isInstantEntrance = !ad.isEntranceKnown;
    const isBeforeMaximalEntrance = (ad.isEntranceKnown && ad.entrance <= query.maximumEntranceDate);
    const isAfterMinimalEntrance =  (ad.isEntranceKnown && ad.entrance >= query.minimalEntranceDate);
    
    if (isInstantEntrance) {
        ad.addTags('מיידית')
    }

    return isInstantEntrance || (isBeforeMaximalEntrance && isAfterMinimalEntrance);
}

const processAds = co.wrap(function*() {
    const summary = new Stats();

    const processPage = function*(pageNumber) {
        const page = yield fetcher.fetchPage({page: currentPage});
        const ads = parseAds(page);

        summary.increment('retrieved', ads.length);

        const enhancedAds = yield _.chain(ads)
            .filter(ad => !adsRepository.wasAlreadySent(ad.id))
            .forEach(ad => summary.increment('not_already_handled'))
            .filter(ad => ad.coordinates.latitude && ad.coordinates.longitude)
            .forEach(ad => summary.increment('has_coordinates'))
            .filter(ad => filterByAndAddMatchingAreas(ad))
            .forEach(ad => summary.increment('within_polygon'))
            .map(ad => fetcher.fetchAd(ad).then(extraAdData => new EnhancedAd(ad, extraAdData)))
            .value();

        yield _.chain(enhancedAds)
            .filter(ad => filterByAndAddMatchingDate(ad))
            .forEach(ad => summary.increment('has_matching_entrance_date'))
            .map(ad => 
                dispatcher(ad).then(() => {
                    adsRepository.updateSent(ad.id);
                    summary.increment('dispatched');
                })
            )
            .value();

        yield adsRepository.flush();
        management.updateStats(summary.toHtml());

        return {
            done: page.data.current_page === page.data.total_pages,
        };
    };

    let currentPage = 1;
    while (true) {
        try {
            const result = yield processPage(currentPage++);

            if (result.done) {
                break;
            }
        } catch (error) {
            log(error);
        }
    }

    log('Done with run!');
    log(summary.toString() + os.EOL + os.EOL);
});

processAds();
setInterval(processAds, 60 * 60 * 1000);
