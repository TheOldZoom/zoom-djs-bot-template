const { WebhookClient, EmbedBuilder } = require("discord.js");
const { onReadyWebhookUrl, onReadyWebhook } = require("../../../config.json");
const { onReady } = require("../../../configMessages.json");
const { onReadyMessageWebhook } = onReady;

module.exports = (c, client, handler) => {
  const { replaceText } = require("../../utils/replace");
  const onReadyMessage = replaceText(onReadyMessageWebhook, client);

  const embed = new EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
    .setDescription(`${onReadyMessage}`);
  if (onReadyWebhook === true) {
    if (onReadyWebhookUrl) {
      const webhook = new WebhookClient({
        url: onReadyWebhookUrl,
      });
      webhook
        .send({
          embeds: [embed],
          username: client.user.username,
          avatarURL: client.user.avatarURL(),
        })
        .catch((e) => console.log(e));
    } else {
      console.log(`Webhook Message not found.`);
    }
  }
};
