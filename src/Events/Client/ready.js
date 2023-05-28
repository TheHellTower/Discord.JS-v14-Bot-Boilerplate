const Event = globalThis.TheHellTower.Structures.Event;

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  async run() {
    console.log(
      [
        `Logged in as ${this.client.user.tag}`,
        `Loaded ${this.client.events.size} events!`,
        `Loaded ${this.client.commands.size} commands!`,
        `Loaded ${this.client.slashcommands.size} "/" commands!`,
        `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=-1&scope=bot`,
      ].join("\n")
    );

    await this.client.user.setPresence({
      status: "online",
      activities: [
        {
          name: `Type ${this.client.config.defaultPrefix}help`,
        },
      ],
    });
  }
};