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
      enabled: true,
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
      content: await message.translate("Administration:CURRENT_PREFIX", message.guild.id, {
        PREFIX: data.guild.prefix,
        BOT_ID: this.client.user.id
      }),
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
            .setTitle(await message.translate("Administration:CHANGE_PREFIX", message.guild.id));

          const textInputId = `${button.components[0].data.custom_id}Input`;
          const textInput = new TextInputBuilder()
            .setCustomId(textInputId)
            .setLabel(await message.translate("Administration:NEW_PREFIX_PROMPT", message.guild.id))
            .setRequired(true)
            .setStyle(TextInputStyle.Short);

          modal.setComponents(new ActionRowBuilder().addComponents(textInput));

          i.showModal(modal);
          i.awaitModalSubmit({ time: 60_000 })
            .then(async (i) => {
              if(data.guild.prefix == i.fields.getTextInputValue("changePrefixInput")) {
                i.deferUpdate();
                return msg.edit({
                  content: await message.translate("Administration:PREFIX_ALREADY_SET", message.guild.id, {
                    PREFIX: data.guild.prefix
                  }),
                  components: [],
                });
              }
              data.guild.prefix =
                i.fields.getTextInputValue("changePrefixInput");
              await data.guild
                .save()
                .then(async () => {
                  i.deferUpdate();
                  return msg.edit({
                    content: await message.translate("Administration:PREFIX_UPDATE_SUCCESS", message.guild.id, {
                      PREFIX: data.guild.prefix
                    }),
                    components: [],
                  });
                })
                .catch(async () => {
                  msg.edit({
                    content: await message.translate("Common:SUPPORT_TICKET_ERROR_MESSAGE", message.guild.id),
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