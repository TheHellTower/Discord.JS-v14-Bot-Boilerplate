const { Client, Collection, GatewayIntentBits, Options } = require("discord.js"),
  Util = require("./Util.js");

module.exports = class BoilerplateClient extends Client {
  constructor(options = {}) {
    super({
      allowedMentions: {
        repliedUser: true,
      },
      intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
      ],
      makeCache: Options.cacheEverything(),
    });

    this.validate(options);
    this.config = options;

    this.commands = new Collection();

    this.slashcommands = new Collection();

    this.aliases = new Collection();

    this.slashaliases = new Collection();

    this.events = new Collection();

    this.utils = new Util(this);

    this.languages = require("../Languages/language-meta.json");

    globalThis.TheHellTower = {
      Config: options,
      Modules: {
        fs: require("fs"),
        mongoose: require("mongoose"),
      },
      Models: {
        Guilds: null,
        Users: null,
      },
      Structures: {
        Command: require("./Command"),
        Event: require("./Event"),
        SlashCommand: require("./SlashCommand"),
      },
      Util: this.utils
    };

    require("../Helpers/Extenders.js");

    globalThis.TheHellTower.Modules.mongoose.set("strictQuery", false);
    globalThis.TheHellTower.Modules.mongoose
      .connect(options.MONGOOSE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Unable to connect to MongoDB Database.\nError: " + err);
      });
    globalThis.TheHellTower.DB = require("../Handlers/DataBase/DataBase.js");
  }

  get defaultLanguage() {
    return this.languages.find((language) => language.default).name;
  }

  translate(key, args, locale) {
    if (!locale) locale = this.defaultLanguage;
    const language = this.translations.get(locale);
    if (!language) throw "Invalid language set in data.";
    return language(key, args);
  }
  
  validate(options) {
    if (typeof options !== "object")
      throw new TypeError("Options should be a type of Object.");

    if (!options.TOKEN)
      throw new Error("You must pass the token for the client.");

    if (!options.defaultPrefix)
      throw new Error("You must pass a prefix for the client.");
    if (typeof options.defaultPrefix !== "string")
      throw new TypeError("Prefix should be a type of String.");

    if (!options.owners)
      throw new Error("You must pass a list of owners for the client.");
    if (!Array.isArray(options.owners.split(", ")))
      throw new TypeError("Owners should be a type of Array<String>.");
  }

  async start(token = this.config.token) {
    this.utils.loadCommands();
    this.utils.loadEvents();

    const _languages = require("../Handlers/Languages.js");
    this.translations = await _languages();

    super.login(token).then(async () => {
      this.utils.loadSlashCommands();
    });
  }
};