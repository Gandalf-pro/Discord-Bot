import Command from "./Command";


class Rainbow extends Command {
    public name: string = "rainbow";
    public description: string = "Display rainbow six siege info";
    public aliases: string[] = ["r6"];
    execute(msg: import("discord.js").Message, args: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super();
    }
}

export default Rainbow;