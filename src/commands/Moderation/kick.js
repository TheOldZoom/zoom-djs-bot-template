const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  Interaction,
} = require("discord.js");
const {} = require("../../../configMessages.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick a user from your server")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((o) =>
      o.setName("user").setDescription("The user to ban").setRequired(true)
    )
    .addStringOption((o) =>
      o
        .setName("reason")
        .setDescription("The reason for the ban")
        .setRequired(false)
    ),

  run: async ({ interaction, client, handler }) => {
    const embed = new EmbedBuilder();
    if (!interaction.guild) {
      embed
        .setColor("Red")
        .setTitle("Error")
        .setDescription("This command can only be used in a server.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const user = interaction.options.getUser("user");
    const reason =
      interaction.options.getString("reason") || "No reason provided";


    if (!user) {
      embed
        .setColor("Red")
        .setTitle("Error")
        .setDescription("Please provide a valid user to ban.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const member = interaction.guild.members.resolve(user);
    if (!member) {
      embed
        .setColor("Red")
        .setTitle("Error")
        .setDescription("That user is not in this server.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!member.bannable) {
      embed
        .setColor("Red")
        .setTitle("Error")
        .setDescription("I cannot ban this user.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {
      let sends = "No";
      try {
        const embeds = new EmbedBuilder({
          author: {
            name: interaction.user.username,
            iconURL: interaction.user.avatarURL(),
          },
          description: `You have been banned from **${interaction.guild.name}** for **${reason}**`,
          timestamp: new Date(),
        }).setColor(`${client.color}`);
        await member.send({
          embeds: [embeds],
        });
        sends = "Successfully sent a message";
      } catch (error) {
        sends = "Couldn't send a message";
      }

      embed
        .setColor("Green")
        .setTitle("Success")
        .setDescription(
          `Successfully banned **${user.tag}**. Reason: ${reason}`
        )
        .setFields({ name: "Sent message", value: sends });
      await member.ban({ reason });
      return interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      embed
        .setColor("Red")
        .setTitle("Error")
        .setDescription("There was an error trying to ban the user.");
      return interaction.reply({ embeds: [embed] });
    }
  },

  options: {
    userPermissions: ["BanMembers"],
    botPermissions: ["BanMembers"],
  },
};
