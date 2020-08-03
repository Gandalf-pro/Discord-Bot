import Command from "./Command";
import vault from "../Vault";
import { play } from "../util/youtube";

class Seek extends Command {
    public name: string = "seek";
    public description: string = "Seek command for seeking";
    public aliases: string[] = [];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        if (guildData.queue.songs.length < 1 || !guildData.queue.playing) {
            msg.channel.send("No songs playing currently cant seek");
            return;
        }
        let connection = guildData.queue.connection;
        if (!connection) {
            return;
        }
        if (connection.dispatcher == null) {
            return;
        }
        // let seek = Number(args[0]);
        let times = args[0].match(/[0-9]+:[0-9]+/g);
        if (times) {
            var time = times.shift();
        }
        let seek: number;
        if (time) {
            let actualTimes = time.split(":");
            let min = Number(actualTimes[0]);
            let sec = Number(actualTimes[1]);
            seek = (min * 60) + sec;
        } else {
            seek = Number(args[0]);
            if (Number.isNaN(seek)) {
                msg.channel.send("You have to enter a number in seconds like 15");
                return;
            }
        }
        
        if (seek < 0) seek = 0;

        // if (connection.dispatcher.paused) {
        //     console.log("Paused");
        //     connection.dispatcher.resume();
        // }
        connection.dispatcher.removeAllListeners("finish");

        connection.dispatcher.end(() => {
            play(msg.guild!.id, guildData!.queue.songs[0], seek);
        });
        return;
    }
    constructor() {
        super();
    }
}

export default Seek;
