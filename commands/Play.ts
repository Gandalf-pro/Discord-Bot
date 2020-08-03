import Command from "./Command";
import vault from "../Vault";
import Join from "./Join";
import { playWithNameOrLink } from "../util/youtube";

class Play extends Command {
    public name: string = "play";
    public description: string = "Play command for playing music";
    public aliases: string[] = ["çal","p"];
    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let voiceChannel = msg.member!.voice.channel;
        if (!voiceChannel) {
            msg.channel.send("You need to be in a voice channel for me to be able to play music!");
            return;
        }
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        //if we didnt join yet !join
        if (guildData.queue.connection == undefined) {
            await (new Join().execute(msg, args));
        }

        //play the song
        await playWithNameOrLink(msg, args);

        return;
    }
    constructor() {
        super();
    }


}

export default Play;