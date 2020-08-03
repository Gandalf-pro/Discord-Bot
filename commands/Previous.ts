import Command from "./Command";
import vault from "../Vault";
import { play } from "../util/youtube";

class Previous extends Command {
    public name: string = "previous";
    public description: string = "Previous command for going back through the history";
    public aliases: string[] = ["geri","prev"];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        if (guildData.queue.songHistory.length < 1) {
            msg.channel.send("There is no song that I could go back!");
            return;
        }
        let connection = guildData.queue.connection;
        if (!connection) {
            return;
        }
        if (connection.dispatcher == null) {
            return;
        }

        connection.dispatcher.removeAllListeners("finish");

        connection.dispatcher.end(() => {
            guildData!.queue.songs.unshift(guildData!.queue.songHistory[guildData!.queue.songHistory.length - 1]);
            guildData!.queue.songHistory.pop();
            play(msg.guild!.id, guildData!.queue.songs[0]);
        });

        

        return;
    }
    constructor() {
        super();
    }
}

export default Previous;
