const Event = globalThis.TheHellTower.Structures.Event;

module.exports = class extends Event {
    async run(interaction) {
        if(!interaction.isCommand()) return;

        const cmd = interaction.commandName;

        const command = this.client.slashcommands.get(cmd.toLowerCase()) || this.client.slashcommands.get(this.client.slashaliases.get(cmd.toLowerCase()));
        
        if (command) return command.run(interaction);
    }
};