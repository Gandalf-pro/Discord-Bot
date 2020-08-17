import ytdl from "ytdl-core";
import vault from "../Vault";
import ytsr from "ytsr";
import { sendAddedToQueueEmbed, sendNowPlayingEmbed } from "./embeds";
import { StreamOptions } from "discord.js";

export interface song {
    title: string;
    url: string;
    thum: string;
    requestedBy: string;
    durationSec: number;
    seekedSec?: number;
}

async function getSongFromUrl(url: string, username: string) {
    try {
        const songInfo = await ytdl.getInfo(url);
        console.log("TimeStamp:", songInfo.timestamp);        
        let retSong:song = {
            title: songInfo.player_response.videoDetails.title,
            url: url,
            thum: songInfo.player_response.videoDetails.thumbnail.thumbnails[0].url,
            requestedBy: username,
            durationSec: songInfo.player_response.videoDetails.lengthSeconds,
        };
        return retSong;
    } catch (error) {
        console.log(error);
        console.log("Someting getSongFromUrl");
        throw error;
    }
}

async function searchSong(name: string, username: string) {
    let res = await ytsr(name, { limit: 4 });
    let songData = res.items.shift();
    if (songData === undefined) {
        throw "Can't search";
    }
    let splitTime = songData.duration.split(":");
    let seconds = (Number(splitTime[0]) * 60) + Number(splitTime[1])
    
    
    let song:song = {
        title: songData.title,
        url: songData.link,
        thum: songData.thumbnail,
        requestedBy: username,
        durationSec: seconds,
    };

    return song;
}

export async function getRecomendenSong(song: song) {
    let res = (await ytdl.getInfo(song.url)).related_videos.shift();
    let url = `https://www.youtube.com/watch?v=${res!.id}`;
    let retSong = await getSongFromUrl(url, "GOD");
    return retSong;
}

async function getSongFromArgs(msg: import("discord.js").Message, args: string[]) {
    let song: song;
    //if its a youtub url
    if (ytdl.validateURL(args[0])) {
        console.log("Got a url");
        song = await getSongFromUrl(args[0], msg.author.username);
    } else if (args.length > 0) {
        song = await searchSong(args.join(" "), msg.author.username);
    } else {
        throw "Error";
    }
    return song;
}

export async function playWithNameOrLink(msg: import("discord.js").Message, args: string[]) {
    let song = await getSongFromArgs(msg, args);

    let serverQueue = vault.guildData.get(msg.guild!.id)?.queue!;

    serverQueue.songs.push(song);
    //if no songs exists
    if (serverQueue.songs.length < 2) {
        play(msg.guild!.id, song);
    } else {
        sendAddedToQueueEmbed(msg.guild!.id);
    }
}

export async function startPlayingMusic(guildId: string) {}

export async function play(guildId: string, song: song, seek?: number) {
    if (song === undefined) {
        return;
    }
    let serverQueue = vault.guildData.get(guildId)!.queue;
    serverQueue.playing = true;
    let strmOptions: StreamOptions = { volume: serverQueue.volume, highWaterMark: 1 };
    if (seek !== undefined) {
        strmOptions.seek = seek;
    }
    // serverQueue.ytdlStream = ytdl(song.url, { filter: "audio", highWaterMark: 1 << 25 }); //32mb
    const dispatcher = serverQueue.connection!.play(ytdl(song.url, { filter: "audio", highWaterMark: 1 << 25 }), strmOptions);
    dispatcher
        .on("finish", async () => {
            console.log("Music ended!");
            serverQueue.playing = false;
            await serverQueue.skipSong();
            play(guildId, serverQueue.songs[0]);
        })
        .on("error", (error) => {
            console.error(error);
        });
    if (seek === undefined) {
        sendNowPlayingEmbed(guildId);
    }
}

export function getCurrentTime(guildID: any) {
    let guildData = vault.guildData.get(guildID)!;
    if (!guildData.queue.connection) throw { status: "bad" };
    let time = (guildData.queue.connection.dispatcher.streamTime / 1000) + (guildData.queue.songs[0].seekedSec ? guildData.queue.songs[0].seekedSec : 0);
    return time;
}

// function createProgressBar (guildID:any) {
//     // Gets guild queue
//     const queue = this.queues.find((g) => g.guildID === guildID)
//     if (!queue) return
//     // Stream time of the dispatcher
//     const currentStreamTime = queue.voiceConnection.dispatcher
//         ? queue.voiceConnection.dispatcher.streamTime + queue.additionalStreamTime
//         : 0
//     // Total stream time
//     const totalTime = queue.playing.durationMS
//     // Stream progress
//     const index = Math.round((currentStreamTime / totalTime) * 15)
//     // conditions
//     if ((index >= 1) && (index <= 15)) {
//         const bar = '▬▬▬▬▬▬▬▬▬▬▬▬▬▬'.split('')
//         bar.splice(index, 0, '🔘')
//         return bar.join('')
//     } else {
//         return '🔘▬▬▬▬▬▬▬▬▬▬▬▬▬▬'
//     }
// }

async function addSongToQueue() {}
