import fs from "fs";
import { Client } from "discord.js";
import config from "./config.json";
// import Client from "./Client";
const client = new Client();
// import paga from "./commands/Ping";
import vault, { VaultClient } from "./Vault";

async function setVaultData() {
    for (let key of client.guilds.cache.keys()) {
        vault.guildData.set(key, new VaultClient());
    }
}

async function setup() {
    const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".ts") && file !== "Command.ts");
    console.log(commandFiles);

    for (let file of commandFiles) {
        console.log("Loding file:" + file);
        file = file.replace(".ts", "");
        // const command = require(`./commands/${file}`);
        let command = await import(`./commands/${file}`);
        command = command.default;
        let com = new command();

        vault.commands.set(com.name, com);
        vault.aliases.set(com.name, com.name);
        //load its aliases
        for (const alis of com.aliases) {
            vault.aliases.set(alis, com.name);
        }

        console.log("Done loding file");
    }
    client.login(config.token);
}

client.on("ready", () => {
    console.log("Client connected");
    setVaultData();
});

client.on("message", async (msg) => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;
    console.log("Got message:" + msg.content);

    const args = msg.content.slice(config.prefix.length).split(" ");
    let command = args.shift()!.toLowerCase();

    //return if no aliases match
    if (vault.aliases.has(command)) {
        command = vault.aliases.get(command)!;
    } else {
        return;
    }

    try {
        await vault.commands.get(command)!.execute(msg, args);
        msg.delete({ reason: "cleanup", timeout: 5 * 60 * 1000 });
    } catch (error) {
        console.error(error);
        if (error.message == "Method not implemented.") {
            msg.reply("Method not implemented.");
        } else {
            msg.reply("There was an error trying to execute that command!");
        }
    }
});

setup();
