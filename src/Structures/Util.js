const path = require("path"),
  { promisify } = require("util"),
  glob = promisify(require("glob")),
  
  Command = require("./Command.js"),
  SlashCommand = require("./SlashCommand.js"),
  Event = require("./Event.js");

const { REST, Routes, ApplicationCommandManager } = require("discord.js");

module.exports = class Util {
  constructor(client) {
    this.client = client;
  }

  isClass(input) {
    return (
      typeof input === "function" &&
      typeof input.prototype === "object" &&
      input.toString().substring(0, 5) === "class"
    );
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  async reload() {
    console.clear();

    this.loadCommands();

    this.loadSlashCommands();
  }

  async loadCommands() {
    return glob(`${this.directory}Commands/**/*.js`).then((commands) => {
      for (const commandFile of commands) {
        delete require.cache[require.resolve(commandFile)];
        const { name } = path.parse(commandFile);
        const File = require(commandFile);
        if (!this.isClass(File))
          throw new TypeError(`Command ${name} doesn't export a class.`);
        const command = new File(this.client, name.toLowerCase());
        if (!(command instanceof Command))
          throw new TypeError(`Command ${name} doesnt belong in Commands.`);
        this.client.commands.set(command.name, command);
        if (command.aliases.length) {
          for (const alias of command.aliases) {
            if (!this.client.aliases.has(alias)) {
              this.client.aliases.set(alias, command.name);
            }
          }
        }
      }
    });
  }

  async loadSlashCommands() {
    let slashCommands = [];
    return glob(`${this.directory}SlashCommands/**/*.js`).then((commands) => {
      for (const commandFile of commands) {
        delete require.cache[require.resolve(commandFile)];
        const { name } = path.parse(commandFile);
        const File = require(commandFile);
        if (!this.isClass(File))
          throw new TypeError(`Slash Command ${name} doesn't export a class.`);
        const command = new File(this.client, name.toLowerCase());
        if (!(command instanceof SlashCommand))
          throw new TypeError(
            `Slash Comamnd ${name} doesnt belong in Commands.`
          );
        this.client.slashcommands.set(command.name, command);
        slashCommands.push(command.data);
        if (command.aliases.length) {
          for (const alias of command.aliases) {
            this.client.slashaliases.set(alias, command.name);
          }
        }
      }

      (async () => {
        const rest = new REST({ version: "10" }).setToken(
          globalThis.TheHellTower.Config.token
        );
        const myClient = await rest.get(Routes.user());
        await rest.put(Routes.applicationCommands(myClient.id), {
          body: this.client.slashcommands.map((i) =>
            ApplicationCommandManager.transformCommand(i)
          ),
        });
        //await rest.put(Routes.applicationCommands(myClient.id), { body: this.client.slashcommands }).catch(console.log);
      })();
    });
  }

  async loadEvents() {
    return glob(`${this.directory}Events/**/*.js`).then((events) => {
      for (const eventFile of events) {
        delete require.cache[require.resolve(eventFile)];
        const { name } = path.parse(eventFile);
        const File = require(eventFile);
        if (!this.isClass(File))
          throw new TypeError(`Event ${name} doesn't export a class!`);
        const event = new File(this.client, name);
        if (!(event instanceof Event))
          throw new TypeError(`Event ${name} doesn't belong in Events`);
        this.client.events.set(event.name, event);
        event.emitter[event.type](name, (...args) => event.run(...args));
      }
    });
  }
};