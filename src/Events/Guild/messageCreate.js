const Event = globalThis.TheHellTower.Structures.Event;

const cmdCooldown = {};

module.exports = class extends Event {
  async run(message) {
    if (message.author.bot) return; //Will make guildOnly things latter

    if (!message.member) await message.guild.members.fetch(message.author.id);

    const mentionRegex = RegExp(`^<@!?${this.client.user.id}>( |)$`);
    const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

    let guildData;
    if (guildData == undefined) {
      // Load prefix into cache
      guildData = await globalThis.TheHellTower.DB.fetchGuild(message.guild.id);
      message.guild.prefix = guildData.prefix.toLowerCase();
    }

    let userData;
    if (userData == undefined) {
      // Load User into cache
      userData = await globalThis.TheHellTower.DB.fetchUser(message.author.id);
    }

    let prefix = message.guild.prefix;

    ///////////////////////////////////////
      if (
        message.content.match(mentionRegex) ||
        message.content.match(mentionRegexPrefix)
      )
        message.channel.send(
          `\`${message.guild.name}\`'s prefix: \`${prefix}\` !`
        );
      if (!message.content.startsWith(prefix)) return;
  
      const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
  
      const command =
        this.client.commands.get(cmd.toLowerCase()) ||
        this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
      //console.log(command);

      if (command) {
        //console.log(command);
        /* Command Enabled */
        if (
          !command.enabled &&
          !this.client.config.owners.includes(message.author.id)
        ) {
          return message.reply({
            content: `This command is disabled ! Try again later..`,
          });
        }
        /* Command Enabled */
        /* Guild Only Command */
        if (command.guildOnly && !message.guild) {
          return message.reply({
            content: `This command can only be used in a guild !`,
          });
        }
        /* Guild Only Command */
        /* Owner */
        if (
          command.ownerOnly &&
          !this.client.config.owners.includes(message.author.id)
        ) {
          return message.reply({ content: `You are not the bot Owner !` });
        }
        /* Owner */
        /* Permissions */
        command.userPermissions.forEach((perm) => {
          if (!message.channel.permissionsFor(message.author).has(perm)) {
            return message.reply({
              content: `You need the \`${perm}\` permission for this command !`,
            });
          }
        });
        command.botPermissions.forEach((perm) => {
          if (!message.channel.permissionsFor(this.client.user).has(perm)) {
            return message.reply({
              content: `The bot need the \`${perm}\` permission for this command !`,
            });
          }
        });
        /* Permissions */
        /* Cooldown */
        let uCooldown = cmdCooldown[message.author.id];
        if (!uCooldown) {
          cmdCooldown[message.author.id] = {};
          uCooldown = cmdCooldown[message.author.id];
        }
        const time = uCooldown[command.name] || 0;
        if (time && time > Date.now()) {
          return message.reply({
            content: `You need to wait \`${Math.ceil(
              (time - Date.now()) / 1000
            )}\` seconds before using again the command \`${command.name}\``,
          });
        }
        /* Cooldown */
        let data = {
          cmd: command,
          guild: guildData,
          user: userData,
        };
        command.run(message, args, data);
        cmdCooldown[message.author.id][command.name] =
          Date.now() + command.cooldown * 1000;
    }
  }
};
