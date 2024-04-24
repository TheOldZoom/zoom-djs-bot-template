const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const { mainColor } = require("../../../config.json");
let { Thankforadding } = require("../../../configMessages.json");
module.exports = async (guild, client, handler) => {
  try {
    const { replaceGuildText } = require("../../utils/replace");
    Thankforadding = replaceGuildText(Thankforadding, client, guild);
    const embed = new EmbedBuilder()
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.avatarURL(),
      })
      .setColor(`${client.color}`)
      .setDescription(Thankforadding);
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
      if (
        channel.type === ChannelType.GuildText &&
        !channelToSend &&
        channel.permissionsFor(guild.members.me).has("SendMessages")
      )
        channelToSend = channel;
    });
    if (!channelToSend) return;
    channelToSend.send({ embeds: [embed] });
  } catch (err) {}
};
