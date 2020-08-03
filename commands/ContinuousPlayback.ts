import Command from "./Command";
import vault from "../Vault";

class ContinuousPlayback extends Command {
    public name: string = "continuous";
    public description: string = "Continoues command for playing songs continuosly";
    public aliases: string[] = ["con"];
    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id)!;
        if (!guildData.queue.connection) {
            msg.channel.send("Bot needs to be present to change the volume");
            return;
        }
        guildData.queue.playRelatedSongs = !guildData.queue.playRelatedSongs;        
        if (guildData.queue.playRelatedSongs) {
            msg.channel.send(`Playing related songs`);
        } else {
            msg.channel.send(`Stopped playing related songs`);
        }
        return;
    }
    constructor() {
        super();
    }
}

export default ContinuousPlayback;