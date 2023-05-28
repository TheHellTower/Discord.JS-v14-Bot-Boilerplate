const Command = globalThis.TheHellTower.Structures.Command;
const Util = globalThis.TheHellTower.Util;

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'x',
			category: 'Owner',
			usage: '',
			botPermissions: [],
			userPermissions: [],
			ownerOnly: true,
			guildOnly: true,
			cooldown: 5,
			enabled: true
		});
	}

	async run(message, args) {
		await Util.reload();
		
		console.log([
			`Logged in as ${this.client.user.tag}`,
            `Loaded ${this.client.events.size} events!`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.slashcommands.size} "/" commands!`,
			`https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=-1&scope=bot`
		].join('\n'));
		return message.reply({ content: "Reloaded" });
	}

};