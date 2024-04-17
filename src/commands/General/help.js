const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const buttonPagination = require('../../utils/buttonPagination');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription("Replies with bot's Commands"),

    run: async ({ client, interaction, args }) => {
        const commandFolders = fs.readdirSync('./src/commands');
        const helpEmbeds = [];
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(f => f.endsWith('.js'));
            if (folder === 'DevOnly') continue;
            if (folder === 'tools') continue;

            const categoryEmbed = new EmbedBuilder()
                .setTitle("**Category** " + folder)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL());

            let description = '';

            for (const file of commandFiles) {
                const command = require(`./../${folder}/${file}`);
                if (!command || !command.data) {
                    console.error(`Invalid command file: ${file}`);
                    continue;
                }
                const commandDescription = command.data.description || '> No description provided';
                description += `> **/${command.data.name}**\n> ${commandDescription}\n`;
            }

            if (description !== '') {
                categoryEmbed.setDescription(description);
            } else {
                categoryEmbed.setDescription('No commands available.');
            }

            helpEmbeds.push(categoryEmbed);
        }
        await buttonPagination(interaction, helpEmbeds);
    },
    category: "General"
};
