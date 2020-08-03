import Command from "./Command";

class Ping extends Command{
    public aliases: string[] = [];
    public name: string = "ping";
    public description: string = "ping pong response";
    
    constructor() {
        super();
    }

    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        console.log("Got ping message");
        
        msg.reply("pong");

    }

}

export default Ping;