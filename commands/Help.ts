import Command from "./Command";
import vault from "../Vault";

class Help extends Command {
    public name: string = "help";
    public description: string = "Help command";
    public aliases: string[] = ["h", "yardım"];
    async execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        let text: string = "";
        vault.commands.forEach((val, key) => {
            text += "Name:";
            text += val.name;
            text += " Aliases:";
            text += val.aliases;
            text += " Description:";
            text += val.description;
            text += "\n";
        });
        msg.channel.send(text);
        return;
    }
    constructor() {
        super();
    }
}

export default Help;
