require("dotenv").config();
const { TOKEN } = process.env;

const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./src/Main.js", {
  totalShards: "auto",
  shardList: "auto",
  mode: "process",
  respawn: true,
  shardArgs: [""],
  execArgv: ["--trace-warnings"],
  token: TOKEN,
});

manager.spawn();

//https://old.discordjs.dev/#/docs/discord.js/main/typedef/ShardEvents
manager.on("spawn", (shard) => {
    console.log(`\n==========\n[SHARD] Shard ${shard.id + 1}/${manager.totalShards}\n==========\n`)
});