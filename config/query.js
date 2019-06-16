const moment = require('moment');

const parseIsraelDate = x => moment(x, 'DD/MM/YYYY');

module.exports = {
    areas: [
        {
            labels: ['גבעתיים'],
            points: [
                {longitude: 34.8191865, latitude: 32.0773327},
                {longitude: 34.8148092, latitude: 32.0790781},
                {longitude: 34.8015912, latitude: 32.0754781},
                {longitude: 34.8021491, latitude: 32.0706052},
                {longitude: 34.8175128, latitude: 32.0699869},
            ],
        },
        {
            labels: ['מרכז תל אביב'],
            points: [
                {latitude: 32.086111, longitude: 34.769027},
                {latitude: 32.084575, longitude: 34.785463},
                {latitude: 32.073346, longitude: 34.782014},
                {latitude: 32.062221, longitude: 34.773691},
            ],
        },
        {
            labels: ['תל אביב צפון ישן'],
            points: [
                {longitude: 34.7753954, latitude: 32.097888},
                {longitude: 34.7695279, latitude: 32.0853231},
                {longitude: 34.7982264, latitude: 32.0809448},
                {longitude: 34.8026896, latitude: 32.0997057},
            ],
        },
        {
            labels: ['דרום תל אביב'],
            points: [
                {latitude: 32.0671196, longitude: 34.7626948},
                {latitude: 32.0533444, longitude: 34.7541547},
                {latitude: 32.0486248, longitude: 34.7636712},
                {latitude: 32.0546902, longitude: 34.7650981},
                {latitude: 32.0547447, longitude: 34.7721148},
                {latitude: 32.0605369, longitude: 34.7738957},
                {latitude: 32.0606141, longitude: 34.770779},
                {latitude: 32.0671196, longitude: 34.7626948},
            ],
        },
    ],
    minimumEntranceDate: parseIsraelDate('01/08/2019'),
    apartment: {
        cat: 2,
        subcat: 2,
        fromPrice: 3500,
        toPrice: 7000,
        city: 5000, // 5000 - TLV, 6300 - Givatayim
        fromRooms: 2,
        toRooms: 3.5,
        fromSquareMeter: 60,

        // Only add the filters you actually need. 0 = false, 1 = true, commented out = whatever
        // parking: 1,
        // elevator: 1,
        // airConditioner: 1,
        // bars: 1,
        // shelter: 1,
        // renovated: 1,
        // balcony: 1,
        // sunProch: 1,
        // warhouse: 1,
        // accessibility: 1,
        // Immediate: 1,
        // furniture: 1,
        // pandorDoors: 1,
        // pets: 1,
        // forPartners: 1,
        // longTerm: 1,
        // priceOnly: 1,
        imgOnly: 1,
    },
};
