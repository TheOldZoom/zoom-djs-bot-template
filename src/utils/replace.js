function replaceText(originalText, client) {
  originalText = originalText
    .replace("{bot_name}", client.user.username)
    .replace("{servers_count}", client.guilds.cache.size);
  return originalText;
}

function replaceGuildText(originalText, client, guild) {
  originalText = originalText
    .replace("{bot_name}", client.user.username)
    .replace("{servers_count}", client.guilds.cache.size)
    .replace("{server_name}", guild.name);
  return originalText;
}
function replaceKickText(originalText, client, guild) {
  originalText = originalText
    .replace("{bot_name}", client.user.username)
    .replace("{servers_count}", client.guilds.cache.size)
    .replace("{server_name}", guild.name);
  return originalText;
}
module.exports = {
  replaceText: replaceText,
  replaceGuildText: replaceGuildText,
  replaceKickText: replaceKickText,
};
