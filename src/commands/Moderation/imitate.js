const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("imitate")
    .setDescription("Imitate someone")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to imitate")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to imitate")
        .setMaxLength(1999)
        .setRequired(true)
    ),

  run: async ({ interaction, client, handler }) => {
    const user = interaction.options.getUser("user");
    const message = interaction.options.getString("message");

    if (!user || !message)
      return interaction.reply(
        "Please specify a user and a message to imitate."
      );

    try {
      const server = interaction.guild;
      if (!server)
        return interaction.reply("This command can only be used in a server.");

      const webhook = await interaction.channel.createWebhook({
        name: `${user.displayName}`,
        avatar: user.avatarURL(),
        reason: `/imitate command ran by ${interaction.user.displayName}`,
      });

      await webhook.send(message, {
        username: user.username,
        avatarURL: user.avatarURL(),
      });

      await webhook.delete();

      interaction.reply(`Message sent as ${user.username}`);
    } catch (error) {
      console.error("Error sending message:", error);
      interaction.reply("An error occurred while sending the message.");
    }
  },

  options: {
    devOnly: true,
    userPermissions: ["Administrator", "AddReactions"],
    botPermissions: ["Administrator", "AddReactions"],
    deleted: false,
  },
};
