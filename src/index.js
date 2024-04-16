require('dotenv/config');
const {CommandKit} = require("commandkit");
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent] });
const { TOKEN } = process.env;
let { devGuildIds, devUserIds} = require("./config.json");
(async () => {

    client.cooldown = new Collection();
    new CommandKit({
        client,
        commandsPath: path.join(__dirname, 'commands'),
        eventsPath: path.join(__dirname, 'events'),
        validationsPath: path.join(__dirname, 'validations'),
        devGuildIds: devGuildIds,
        devUserIds: devUserIds,
        bulkRegister: true,
    });

    await client.login(TOKEN);
})();

