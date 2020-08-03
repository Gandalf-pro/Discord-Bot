import Command from "./Command";
import vault from "../Vault";

class Pause extends Command {
    public name: string = "pause";
    public description: string = "Pause command for pausing";
    public aliases: string[] = [];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        if (guildData.queue.songs.length < 1) {
            msg.channel.send("No songs playing currently cant pause");
            return;
        }
        let connection = guildData.queue.connection;
        if (!connection) {
            return;
        }
        if (connection.dispatcher == null) {
            return;
        }
        guildData.queue.playing = false;
        connection.dispatcher.pause();
        return;
    }
    constructor() {
        super();
    }
}

export default Pause;
