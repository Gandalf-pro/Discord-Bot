import Command from "./Command";
import vault from "../Vault";
import { getCurrentTime } from "../util/youtube";

class CurrentTime extends Command {
    public name: string = "currentTime";
    public description: string = "Time of the currently playing song";
    public aliases: string[] = ["ct"];
    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id)!;
        if (!guildData.queue.connection) {
            msg.channel.send("Bot needs to be present to change the volume");
            return;
        }
        if (!guildData.queue.playing) {
            msg.channel.send("Nothing is playing");
            return;
        }
        let time = getCurrentTime(msg.guild!.id);
        msg.channel.send(`Stream Time:${time} sec`);
        return;
    }
    constructor() {
        super();
    }
}

export default CurrentTime;