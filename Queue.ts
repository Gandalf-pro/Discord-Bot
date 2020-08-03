import { TextChannel, VoiceChannel, VoiceConnection } from "discord.js";
import { song, getRecomendenSong } from "./util/youtube";
import { Readable } from "stream";

class Queue {
    textChannel?:TextChannel;
    voiceChannel?:VoiceChannel;
    connection?:VoiceConnection;
    songs: song[] = [];
    songHistory: song[] = [];
    volume = 0.5;
    playing = false;
    ytdlStream?: Readable;
    playRelatedSongs = false;
    constructor() {
    }

    reset() {
        this.connection = undefined;
        this.textChannel = undefined;
        this.voiceChannel = undefined;
        this.songs = [];
        this.songHistory = [];
        this.volume = 0.5;
        this.playing = false;
    }

    async skipSong() {
        if (this.ytdlStream !== undefined) {
            this.ytdlStream.destroy();
            this.ytdlStream = undefined;
        }
        let poped = this.songs.shift();
        if (poped) {
            this.songHistory.push(poped);
            if (this.songs.length < 1 && this.playRelatedSongs) {
                let songReq = await getRecomendenSong(poped);
                this.songs.push(songReq);
            }
        }
    }

    setVolume(vol: number) {
        this.volume = vol;
        this.connection?.dispatcher.setVolume(vol);
    }

}

export default Queue;