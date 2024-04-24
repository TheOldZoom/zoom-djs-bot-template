require("colors");
const ms = require("ms");
const { EmbedBuilder, Embed } = require("discord.js");

module.exports = async ({ interaction, commandObj, handler, client }) => {
  const { user } = interaction;
  const cooldowns = client.cooldown;

  const commandName = interaction.commandName || interaction.commandID;

  const cooldown = commandObj.options.cooldown || 5;

  const cooldownKey = `${commandName}-${user.id}`;

  if (cooldowns.has(cooldownKey)) {
    const expirationTime = cooldowns.get(cooldownKey);
    const remainingTime = expirationTime - Date.now();

    if (remainingTime > 0) {
      const remainingSeconds = Math.floor(remainingTime / 1000);
      console.log(
        `[COOLDOWN] ${user.username} is on cooldown for ${commandName} for <t:${
          Math.floor(Date.now() / 1000) + remainingSeconds
        }:R>`.yellow
      );

      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setDescription(
          `You're on cooldown! Please wait <t:${Math.floor(
            (Date.now() + remainingTime) / 1000
          )}:R> before using this command again.`
        );

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      cooldowns.delete(cooldownKey);
    }
  }

  // Set expiration time for the cooldown
  const expirationTime = Date.now() + cooldown * 1000;
  cooldowns.set(cooldownKey, expirationTime);
};
