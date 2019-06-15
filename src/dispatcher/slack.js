const config = require("../nconf").get("dispatcher").slack;
const { IncomingWebhook } = require("@slack/webhook");
const _ = require('lodash');

const areasToHooks = _.mapValues(config.hooks.byLabel, url => new IncomingWebhook(url));
const defaultHook = new IncomingWebhook(config.hooks.default);

function dispatch(ad) {
  const text = `${ad.rooms} חדרים
שכונה ${ad.extraData["שכונה"]}
רחוב ${ad.extraData["רחוב"]}
מחיר ${ad.price}₪
${ad.url}`;
  const hook = areasToHooks[ad.matchingAreas[0]] || defaultHook;

  return hook.send({ text });
}

module.exports = dispatch;
