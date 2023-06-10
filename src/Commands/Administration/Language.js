const Command = globalThis.TheHellTower.Structures.Command;
const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { ModalBuilder, TextInputBuilder, ButtonStyle, TextInputStyle } = require("discord.js");

const languages = require("../../assets/jsonFiles/languages.json");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["lang"],
      description: "Edit the bot language.",
      category: "Administration",
      usage: "[set]",
      botPermissions: [],
      userPermissions: ["MANAGE_GUILD"],
      ownerOnly: false,
      guildOnly: true,
      cooldown: 5,
      enabled: true,
    });
  }

  async run(message, args, data) {
    if (args[0] && args[0] === "set") {
        message
          .reply({
            content: await message.translate("Administration:LANGUAGES_LIST", message.guild.id, { LANGUAGES:  languages.join("\n- ") }),
          })
          .then(async (m) => {
            const languageAnswers = await m.channel
              .awaitMessages({
                filter: (m) => m.author.id === message.author.id,
                time: 30000,
                max: 1,
              })
              .catch(async(e) => {
                message.reply({
                  content: await message.translate("Common:OUT_OF_TIME", message.guild.id),
                });
              });
            var answerMessage = languageAnswers.first();
            answerMessage.delete();
            if (languages.includes(answerMessage.content)) {
              const language = this.client.languages.find(
                (l) =>
                  l.name === answerMessage.content ||
                  l.aliases.includes(answerMessage.content)
              );
              data.guild.language = language.name;
              await data.guild
                .save()
                .then(async() => {
                  message.reply({
                    content: await message.translate("Administration:LANGUAGES_UPDATE_SUCCESS", message.guild.id),
                  });
                })
                .catch(async() => {
                  message.reply({
                    content:
                    await message.translate("Common:SUPPORT_TICKET_ERROR_MESSAGE", message.guild.id),
                  });
                });
            } else {
              return message.reply({
                content: await message.translate("Administration:LANGUAGES_NOT_SUPPORTED", message.guild.id),
              });
            }
          });
      } else {
        const language = this.client.languages.find(
          (l) =>
            l.name === data.guild.language ||
            l.aliases.includes(data.guild.language)
        );
        return message.reply({
          content: await message.translate("Administration:LANGUAGES_NO_ARG", message.guild.id, {
            LANGUAGE_NATIVE_NAME: language.nativeName
          }),
        });
      }
    }
};