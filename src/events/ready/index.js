const {  } = require("../../config.json")
const { onReady } = require("../../configMessages.json");
let onReadyMessage = onReady.onReadyMessage
require("colors")
module.exports = (c, client, handler) => {
    const {replaceText} = require("../../utils/replace")
    onReadyMessage = replaceText(onReadyMessage, client)

    console.log(`✅ ${onReadyMessage}`.green);
};