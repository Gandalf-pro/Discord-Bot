import Command from "./Command";
import vault from "../Vault";

class History extends Command {
    public name: string = "history";
    public description: string = "History command for listing the songs that have played";
    public aliases: string[] = [];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        if (guildData.queue.songHistory.length < 1) {
            msg.channel.send("History is empty");
            return;
        }

        let text = "";
        guildData.queue.songHistory.forEach((element, i) => {
            text += i + 1 + "." + element.title + "\n";
        });
        msg.channel.send(text);

        return;
    }
    constructor() {
        super();
    }
}

export default History;
