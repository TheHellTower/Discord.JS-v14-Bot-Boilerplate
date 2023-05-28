const SlashCommand = globalThis.TheHellTower.Structures.SlashCommand;

module.exports = class extends SlashCommand {
	constructor(...args) {
		super(...args, {
			aliases: ["pong"],
			description: 'This provides the ping of the bot',
			category: 'Informations',
			usage: '',
			botPermissions: [],
			userPermissions: [],
			ownerOnly: false,
			guildOnly: true,
			cooldown: 5,
			enabled: true,
			data: {
				name: "ping",
				description: 'This provides the ping of the bot',
				type: 1,
				options: []
			}
		});
	}

	async run(interaction) {
		const start = Date.now();
		await interaction.reply({
			content: "Pinging...",
			ephemeral: true
		}).then(msg => {
			const end = Date.now();
			const latency = end - start;
			return interaction.editReply({
				content: `**> Bot Latency:** \`${latency}ms\`\n**> API Latency:** \`${Math.round(this.client.ws.ping)}ms\``,
				allowedMentions: {repliedUser: true}
			});
		});
	}
};