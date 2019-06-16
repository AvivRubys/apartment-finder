const dispatchConfig = require('../nconf').get('dispatcher');

switch (dispatchConfig.type) {
    case 'email':
        module.exports = require('./email');
        break;
    case 'github':
        module.exports = require('./github');
        break;
    case 'slack':
        module.exports = require('./slack');
        break;
    default:
        console.warn('No/bad dispatcher configuration - defaulting to console.log');
        module.exports = ad => console.log(ad.url);
}
