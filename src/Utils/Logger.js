//const chalk = require("chalk");

class Logger {
    static Info(message) {
        //console.log(`${chalk.red("[")}${chalk.blue("INFOS")}${chalk.red("]")} => ${chalk.blue(message)}`)
        console.log(`[INFOS] => ${message}`);
    }

    static Error(error) {
        //console.log(`${chalk.red("[")}${chalk.blue("ERROR")}${chalk.red("]")} => ${chalk.red(error)}`)
        console.log(`[ERROR] => ${message}`);
    }
}

module.exports = Logger;