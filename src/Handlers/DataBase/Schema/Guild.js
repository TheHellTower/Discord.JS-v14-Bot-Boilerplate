var mongoose = globalThis.TheHellTower.Modules.mongoose;

const guildSchema = new mongoose.Schema({
  id: { type: String }, //ID of the guild
  registeredAt: { type: Number, default: Date.now() },
  prefix: { type: String, default: "*" },
  language: { type: String, default: "en-US"}
});

module.exports = mongoose.model("Guild", guildSchema);