module.exports = class Command {
	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.description = options.description || 'No description provided.';
		this.category = options.category || 'Miscellaneous';
		this.usage = `${this.name} ${options.usage || ''}`.trim();
		this.botPermissions = options.botPermissions || [];
		this.userPermissions = options.userPermissions || [];
		this.ownerOnly = options.ownerOnly || false;
		this.guildOnly = options.guildOnly || false;
		this.cooldown = options.cooldown || 1;
		this.enabled = options.enabled || false;
	}

	async run(message, args) {
		throw new Error(`[Command] ${this.name} doesn't provide a run method !`);
	}
};