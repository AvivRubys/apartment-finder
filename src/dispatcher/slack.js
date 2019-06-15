const config = require("../nconf").get("dispatcher").slack;
const { IncomingWebhook } = require("@slack/webhook");

const areasToUrls = {
  "south tel aviv":
    "https://hooks.slack.com/services/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",
  "central tel aviv":
    "https://hooks.slack.com/services/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",
  givatayim:
    "https://hooks.slack.com/services/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",
  "ramat gan":
    "https://hooks.slack.com/services/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",
  default:
    "https://hooks.slack.com/services/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"
};

const areasToHooks = Object.entries(areasToUrls)
  .map(([area, url]) => [area, new IncomingWebhook(url)])
  .reduce((obj, val) => {
    obj[val[0]] = val[1];
    return obj;
  }, {});

function dispatch(ad) {
  const text = `דירת ${ad.rooms} חדרים בשכונת ${ad.extraData["שכונה"]} רחוב ${
    ad.extraData["רחוב"]
  }
${ad.rooms} שקל לחודש
${ad.url}`;

  return areasToHooks[ad.matchingAreas[0] || "default"].send({ text });
}

module.exports = dispatch;
