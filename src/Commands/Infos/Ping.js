const Command = globalThis.TheHellTower.Structures.Command;

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["pong"],
      description: "This provides the ping of the bot",
      category: "Informations",
      usage: "",
      botPermissions: [],
      userPermissions: [],
      ownerOnly: false,
      guildOnly: true,
      cooldown: 5,
      enabled: true,
    });
  }

  async run(message) {
    const msg = await message.reply({
      content: "Pinging...",
    });
    const latency = msg.createdTimestamp - message.createdTimestamp;

    msg.edit({
      content: `**> Bot Latency:** \`${latency}ms\`\n**> API Latency:** \`${Math.round(
        this.client.ws.ping
      )}ms\``,
    });
  }
};
