const {URL} = require('url');
const fetch = require('node-fetch');
const FormData = require('form-data');
const query = require('../config/query');

const BASE_URL = 'https://app.yad2.co.il/api/v1.0/';
const BASE_PAGE_URL = BASE_URL + 'feed/feed.php';
const BASE_AD_URL = BASE_URL + 'ad/ad.php';

async function fetchPage(options) {
    const queryParams = Object.assign({}, query.apartment, options);
    const url = new URL('https://app.yad2.co.il/api/v1.0/feed/feed.php');

    Object.keys(queryParams).forEach(key => {
        url.searchParams.append(key, queryParams[key]);
    });

    const response = await fetch(url.href, {
        headers: {
            'User-Agent':
                'Mozilla/5.0 (Linux; Android 7.0; SM-N920C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36',
            Referer: 'https://app.yad2.co.il/',
        },
    });

    return await response.json();
}

async function fetchAd(ad) {
    const adUrl = BASE_AD_URL + '?id=' + ad.id;
    const response = await fetch(adUrl, {
        headers: {
            Referer: 'https://app.yad2.co.il/',
            'User-Agent':
                'Mozilla/5.0 (Linux; Android 7.0; SM-N920C Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36',
        },
    });

    return await response.json();
}

module.exports = {
    fetchPage,
    fetchAd,
};
