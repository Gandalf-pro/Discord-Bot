import Discord from "discord.js";
abstract class Command {
    public abstract name: string;
    public abstract description: string;
    public abstract aliases: string[];
    constructor() {}

    abstract async execute(msg: Discord.Message, args: string[]): Promise<void>;
}

export default Command;