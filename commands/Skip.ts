import Command from "./Command";
import vault from "../Vault";

class Skip extends Command {
    public name: string = "skip";
    public description: string = "Skip command for skiping through the queue";
    public aliases: string[] = ["geç"];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        if (guildData.queue.songs.length < 1) {
            msg.channel.send("There is no song that I could skip!");
            return;
        }
        guildData.queue.connection!.dispatcher.end();

        return;
    }
    constructor() {
        super();
    }
}

export default Skip;
