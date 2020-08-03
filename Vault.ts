import Queue from "./Queue";
import { Collection } from "discord.js";
import Command from "./commands/Command";

export class Vault {
    guildData: Map<string, VaultClient> = new Map();
    commands: Collection<string, Command> = new Collection();
    aliases: Collection<string, string> = new Collection();
}

export class VaultClient {
    queue: Queue;
    constructor() {
        this.queue = new Queue();
    }
}

let vault = new Vault();
export default vault;
