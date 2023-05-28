var mongoose = globalThis.TheHellTower.Modules.mongoose;

const userSchema = new mongoose.Schema({
    id: { type: String }, //ID of the user
    registeredAt: { type: Number, default: Date.now() }
});

module.exports = mongoose.model("User", userSchema);