module.exports = class SlashCommand {
	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'No description provided.';
		this.category = options.category || 'Miscellaneous';
		this.usage = `/${this.name} ${options.usage || ''}`.trim();
		this.data = options.data || {};
		this.type = options.data.type || 3;
		this.options = options.data.options || [];
	}

	async run(interaction) {
		throw new Error(`[/Command | Slash Command] ${this.name} doesn't provide a run method !`);
	}
};