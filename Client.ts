import { Client, Collection } from "discord.js";
import config from "./config.json";
import Command from "./commands/Command";
import Queue from "./Queue";

class VaultClient extends Client {
    queues: Map<string, Queue>;
    config: { prefix: string };
    commands: Collection<string, Command>;
    aliases: Collection<string, string>;
    constructor() {
        super();
        this.config = config;
        this.commands = new Collection();
        this.aliases = new Collection();

        this.queues = new Map();
    }
}

export default VaultClient;
