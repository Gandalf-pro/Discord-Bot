import Command from "./Command";
import vault from "../Vault";

class Volume extends Command {
    public name: string = "volume";
    public description: string = "Volume command for changing the volume";
    public aliases: string[] = ["ses", "vol"];
    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let level = parseFloat(args[0]);
        
        
        let guildData = vault.guildData.get(msg.guild!.id)!;
        if (!guildData.queue.connection) {
            msg.channel.send("Bot needs to be present to change the volume");
            return;
        }

        if (!level) {
            // msg.channel.send("Enter a number eg.(0.5)").then((msg1) => {
            //     msg1.delete({ reason: "cleanup", timeout: (30 * 1000) });
            // });
            msg.channel.send(`Current Volume:${guildData.queue.volume}`).then((msg1) => {
                msg1.delete({ reason: "cleanup", timeout: (20 * 1000) });
            });
            return;
        }

        if (!guildData.queue.connection!.dispatcher) {
            msg.channel.send("Nothing currently playing cany change the volume");
            return;
        }
        guildData.queue.setVolume(level);
        // guildData.queue.connection!.dispatcher.setVolume(level);
        msg.channel.send(`Changed volume to ${level}`).then((msg1) => {
            msg1.delete({ reason: "cleanup", timeout: (10 * 1000) });
        });
        return;
    }
    constructor() {
        super();
    }
}

export default Volume;
