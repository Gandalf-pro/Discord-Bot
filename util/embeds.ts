import { MessageEmbed, Message } from "discord.js";
import vault from "../Vault";

function delAfterMin(mes:Message, min:number) {
    min = min * 60 * 1000;
    min = Math.round(min);
    mes.delete({timeout:min});
}

export async function sendAddedToQueueEmbed(guildId: string) {
    let serverQueue = vault.guildData.get(guildId)!.queue;
    let textChannel = serverQueue.textChannel!;
    let song = serverQueue.songs[serverQueue.songs.length - 1];
    // textChannel.send(`${song.title} has been added to the queue!`);
    let rich = new MessageEmbed()
        .setColor("#553778")
        .setTitle(song.title)
        .setURL(song.url)
        .setAuthor("Has Been Added To The Queue")
        .setThumbnail(song.thum)
        .addField("DJ:", song.requestedBy, false);
    textChannel.send(rich).then((mes) => {
        delAfterMin(mes, 0.5);
    });
}

export async function sendNowPlayingEmbed(guildId: string) {
    let serverQueue = vault.guildData.get(guildId)!.queue;
    let textChannel = serverQueue.textChannel!;
    let song = serverQueue.songs[0];
    const rich = new MessageEmbed()
        .setColor("#553778")
        .setTitle(song.title)
        .setURL(song.url)
        .setAuthor("Now Playing")
        .setThumbnail(song.thum)
        .addField("DJ:", song.requestedBy, false);
    textChannel.send(rich).then((mes) => {
        delAfterMin(mes, 1.5);
    });
}
