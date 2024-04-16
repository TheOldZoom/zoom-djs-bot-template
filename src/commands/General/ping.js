const { SlashCommandBuilder } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("Replies with the bot's ping"),
 
    run: ({ interaction, client, handler }) => {
        interaction.reply(`Pong ! 🏓`);
        setTimeout(() => {
            interaction.editReply(`Ping: \`${client.ws.ping}ms\``);
        }, 3000)
    },
 
    options: {

    },
};