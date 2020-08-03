import Command from "./Command";
import vault from "../Vault";

class Join extends Command {
    public name: string = "leave";
    public description: string = "Leave command for bot to leave the voice channel";
    public aliases: string[] = ["git"];

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let voiceChannel = msg.member!.voice.channel;
        if (!voiceChannel) {
            msg.channel.send("You need to be in a voice for me to be able to leave!");
            return;
        }
        let guildData = vault.guildData.get(msg.guild!.id);
        if (!guildData) {
            msg.channel.send("Can't find guild data try again later");
            return;
        }

        await voiceChannel.leave();
        guildData.queue.reset();
        return;
    }
    constructor() {
        super();
    }
}

export default Join;