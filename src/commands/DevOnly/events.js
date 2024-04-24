const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Emits a event"),

  run: ({ interaction, client, handler }) => {
    interaction.reply(`:ping_pong: Pong! ${client.ws.ping}ms`);
    client.emit("guildCreate", interaction.guild, client);
  },

  options: {
    devOnly: true,
    userPermissions: ["Administrator", "AddReactions"],
    botPermissions: ["Administrator", "AddReactions"],
    deleted: false,
  },
};
