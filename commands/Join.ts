import Command from "./Command";
import vault from "../Vault";

import config from "../config.json";

class Join extends Command {
    public name: string = "join";
    public description: string = "Join command for bot to join the voice channel";
    public aliases: string[] = ["gel", "fbi"];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let voiceChannel = msg.member!.voice.channel;
        if (!voiceChannel) {
            msg.channel.send("You need to be in a voice for me to be able to join!");
            return;
        }
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }

        let connection = await voiceChannel.join();
        guildData.queue.connection = connection;
        guildData.queue.voiceChannel = voiceChannel;
        if (msg.channel.type == "text") {
            guildData.queue.textChannel = msg.channel;
        }

        if (msg.content.startsWith("!fbi")) {
            if (guildData.queue.playing) return;
            let bot = msg.guild!.member(config.trialId) || msg.guild!.member(config.potatoId);
            if (bot) {
                if (bot.nickname !== "FBI") {
                    setTimeout(() => {
                        if (bot) bot.setNickname("");
                    }, 0.5 * 60 * 1000);
                }
                bot = await bot.setNickname("FBI");
                // connection.play("D:\\Coding\\Javacript Projects\\DiscordBotv0.2\\sounds\\fbi.mp3", { volume: 4 });
                console.log(process.cwd());
                
                connection.play( process.cwd() + "/../sounds/fbi.mp3", { volume: 4 });
            }
        }
        return;
    }
    constructor() {
        super();
    }
}

export default Join;
