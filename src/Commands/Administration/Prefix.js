const Command = globalThis.TheHellTower.Structures.Command;
const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { ModalBuilder, TextInputBuilder, ButtonStyle, TextInputStyle } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["prfx"],
      description: "Show or change bot prefix.",
      category: "Administration",
      usage: "",
      botPermissions: [],
      userPermissions: ["MANAGE_GUILD"],
      ownerOnly: false,
      guildOnly: true,
      cooldown: 5,
      enabled: false,
    });
  }

  async run(message, args, data) {
    const button = new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setStyle(ButtonStyle.Primary)
        .setCustomId("changePrefix")
        .setLabel("Change")
    );
    const msg = await message.reply({
      content: `The current prefix for this server is: \`${data.guild.prefix}\`\n\nTips: You can ping (<@${this.client.user.id}>) the bot to know the prefix !`,
      components: [button],
    });

    const modalId = `${button.components[0].data.custom_id}Modal`;

    const collector = msg.createMessageComponentCollector({
      time: 60_000,
    });

    collector.on("collect", async (i) => {
      if (i.user.id !== message.author.id) return;
      //const modalId = `${button.components[0].data.custom_id}Modal`;
      switch (i.customId) {
        case button.components[0].data.custom_id:
          //await collector.stop();
          const modal = new ModalBuilder()
            .setCustomId(modalId)
            .setTitle(`Change Prefix`);

          const textInputId = `${button.components[0].data.custom_id}Input`;
          const textInput = new TextInputBuilder()
            .setCustomId(textInputId)
            .setLabel("Which prefix do you want ?")
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

          modal.setComponents(new ActionRowBuilder().addComponents(textInput));

          i.showModal(modal);
          i.awaitModalSubmit({ time: 60_000 })
            .then(async (i) => {
              if(data.guild.prefix == i.fields.getTextInputValue("changePrefixInput")) {
                i.deferUpdate();
                return msg.edit({
                  content: `Guild prefix was already: \`${data.guild.prefix}\``,
                  components: [],
                });
              }
              data.guild.prefix =
                i.fields.getTextInputValue("changePrefixInput");
              await data.guild
                .save()
                .then(() => {
                  i.deferUpdate();
                  return msg.edit({
                    content: `Guild prefix successfully updated to: \`${data.guild.prefix}\``,
                    components: [],
                  });
                })
                .catch(() => {
                  msg.edit({
                    content: `Open a ticket in support server something went wrong.`,
                  });
                });
              //await data.guild.save();
              //console.log(data.guild);
            })
            .catch(console.error);

          break;
        default:
          console.log("WTF ?");
      }
    });
  }
};
