require("dotenv").config();

const config = process.env,
  BoilerplateClient = require("./Structures/BoilerplateClient.js"),
  client = new BoilerplateClient(config);

client.start();

process.on("unhandledRejection", (reason, p) => {
  console.log(
    `\n\n\n\n\n=== unhandled Rejection ===\n${reason}\n=== unhandled Rejection ===\n\n\n\n\n`
  );
});
process.on("uncaughtException", (err, origin) => {
  console.log(
    `\n\n\n\n\n=== uncaught Exception ===\n${
      err.stack ? err.stack : err
    }\n=== uncaught Exception ===\n\n\n\n\n`
  );
});