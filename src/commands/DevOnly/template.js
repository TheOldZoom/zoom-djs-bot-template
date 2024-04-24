const { SlashCommandBuilder } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder().setName("template").setDescription("template command").setDMPermission(false).setNSFW(false).setDefaultMemberPermissions(),
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`Hey`);
    },
 
    options: {
        devOnly: true,
        userPermissions: ['Administrator', 'AddReactions'],
        botPermissions: ['Administrator', 'AddReactions'],
        deleted: false,
    },
};