const Discord = require("discord.js");
const config = require("./config");
const fs = require("fs");

const prefix = config.prefix;

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");

  if(jsfiles.length <= 0){
    console.log("No commands to load.");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands.`);

  jsfiles.forEach((f) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded.`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log("I am ready!");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(prefix)) return;

  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot, message, args);
});

bot.login(config.client.token);