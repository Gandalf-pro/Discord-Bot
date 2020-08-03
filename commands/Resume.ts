import Command from "./Command";
import vault from "../Vault";

class Resume extends Command {
    public name: string = "resume";
    public description: string = "Resume command for resuming";
    public aliases: string[] = [];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        if (guildData.queue.songs.length < 1) {
            msg.channel.send("No songs paused currently cant resume");
            return;
        }
        let connection = guildData.queue.connection;
        if (!connection) {
            return;
        }
        if (connection.dispatcher == null) {
            return;
        }
        guildData.queue.playing = true;
        connection.dispatcher.resume();
        return;
    }
    constructor() {
        super();
    }
}

export default Resume;
