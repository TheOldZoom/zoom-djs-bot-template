const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
} = require("discord.js");

module.exports = async (interaction, pages, time = 30 * 1000) => {
  try {
    if (!interaction || !pages || !pages.length > 0)
      throw new Error("Invalid Arguments");

    await interaction.deferReply();

    if (pages.length === 1) {
      return await interaction.editReply({
        embeds: pages,
      });
    }
    const home = new ButtonBuilder()
      .setCustomId("home")
      .setEmoji("⏪")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);
    const prev = new ButtonBuilder()
      .setCustomId("prev")
      .setEmoji("◀")
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);

    const next = new ButtonBuilder()
      .setCustomId("next")
      .setEmoji("▶")
      .setStyle(ButtonStyle.Primary);

    const last = new ButtonBuilder()
      .setCustomId("last")
      .setEmoji("⏩")
      .setStyle(ButtonStyle.Primary);

    const button = new ActionRowBuilder().addComponents(home, prev, next, last);
    let index = 0;

    const msg = await interaction.editReply({
      embeds: [pages[index]],
      components: [button],
      fetchReply: true,
    });

    const mc = await msg.createMessageComponentCollector({
      componentType: ComponentType.BUTTON,
      time,
    });

    mc.on("collect", async (i) => {
      if (i.user.id !== interaction.user.id)
        return await i.reply({
          content: "You are not allowed to do this!",
          ephemeral: true,
        });

      await i.deferUpdate();

      if (i.customId === "prev" && index > 0) {
        index--;
      } else if (i.customId === "home") {
        index = 0;
      } else if (i.customId === "next" && index < pages.length - 1) {
        index++;
      } else if (i.customId === "last") {
        index = pages.length - 1;
      }

      prev.setDisabled(index === 0);
      home.setDisabled(index === 0);
      next.setDisabled(index === pages.length - 1);
      last.setDisabled(index === pages.length - 1);

      await msg.edit({
        embeds: [pages[index]],
        components: [button],
      });

      mc.resetTimer();
    });

    mc.on("end", async () => {
      await msg.edit({
        embeds: [pages[index]],
        components: [button],
      });
    });

    return msg;
  } catch (err) {
    console.log(err);
  }
};
