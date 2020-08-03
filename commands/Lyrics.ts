import fetch from "node-fetch";
import config from "../config.json";
import Command from "./Command";
import { Message } from "discord.js";
import vault from "../Vault";
const chLimit = 2000;

export interface LyricsResponse {
    status: boolean;
    source?: string;
    name?: string;
    artist?: string;
    lyrics?: string;
    message?: string;
}

class Lyrics extends Command {
    public aliases: string[] = ["söz", "sözler", "lyric"];
    public name: string = "lyrics";
    public description: string = "Get the lyrics for the song";
    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }
        let songName: string | null = null;
        if (args.length > 0) {
            songName = args.join(" ");
        } else if (guildData.queue.songs.length > 0) {
            songName = guildData.queue.songs[0].title;
        }
        if (songName === null) {
            msg.channel.send("Can't search any lyrics please provide a songname or play a song");
            return;
        }
        let lyrics = await Lyrics.getLyrics(songName);
        if (lyrics.status) {
            await this.sendToTextChannel(msg, lyrics);
        } else {
            msg.reply("Cant get the lyrics");
        }
    }
    constructor() {
        super();
    }

    static async getLyrics(songName: string) {
        let url = `http://${config.lyricServer}:${config.lyricPort}/api/${songName}?key=${config.lyricApiKey}`;
        let response = await fetch(url);

        let result: LyricsResponse = await response.json();
        return result;
    }

    private async sendToTextChannel(msg: Message, song: LyricsResponse) {
        let lyrics = song.lyrics!;
        let textChannel = msg.channel;
        textChannel.send(`Song:${song.name} from:${song.artist} source:${song.source}`);

        let count = Math.ceil(lyrics.length / chLimit);
        for (let i = 0; i < count; i++) {
            if (lyrics.length > (i + 1) * chLimit) {
                textChannel.send(lyrics.slice(i * chLimit, (i + 1) * chLimit));
            } else {
                textChannel.send(lyrics.slice(i * chLimit));
            }
        }
    }
}

export default Lyrics;
