const { Guild, Message, EmbedBuilder } = require("discord.js");
const DB = require("../Handlers/DataBase/DataBase.js");

Message.prototype.translate = async function(key, UID, args) {
	const dbLanguage = await getServerLanguage(UID);
	const language = this.client.translations.get(
		this.guild ? dbLanguage : "en-US"
	);
	if (!language) throw "Message: Invalid language set in data.";
	return language(key, args);
};

function getServerLanguage(UID){
	return new Promise(async (resolve, reject) => {
		let g = await DB.fetchGuild(UID);
		return resolve(g["language"]);
	})
}

// Wrapper for sendT with error emoji
Message.prototype.error = function(key, args, options = {}) {
	options.prefixEmoji = "error";
	return this.sendT(key, args, options);
};

// Wrapper for sendT with success emoji
Message.prototype.success = function(key, args, options = {}) {
	options.prefixEmoji = "success";
	return this.sendT(key, args, options);
};

// Translate and send the message
Message.prototype.sendT = function(key, args, options = {}) {
	let string = this.translate(key, args);
	if (options.prefixEmoji) {
		string = `${this.client.customEmojis[options.prefixEmoji]} | ${string}`;
	}
	if (options.edit) {
		return this.edit(string);
	} else {
		return this.channel.send(string);
	}
};