import Command from "./Command";
import vault from "../Vault";

class ListQueue extends Command {
    public name: string = "queue";
    public description: string = "Qeueu command for listing the queue";
    public aliases: string[] = ["liste"];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        if (guildData.queue.songs.length < 1) {
            msg.channel.send("Queue is empty");
            return;
        }

        let text = "";
        guildData.queue.songs.forEach((element, i) => {
            text += i + 1 + "." + element.title + "\n";
        });
        msg.channel.send(text);

        return;
    }
    constructor() {
        super();
    }
}

export default ListQueue;
