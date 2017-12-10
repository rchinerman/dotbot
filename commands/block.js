const emojis = require("../resources/emoji.json")

module.exports.run = async (bot, message, args) => {
  try{
    let reply = ""; 
    let content = ""; 
    args.forEach((word) => {
      content += word + " "
    })
    console.log(content);
    content.split('').forEach((letter) => {
      reply += emojis[letter.toUpperCase()]+' ';
    })
    message.channel.send(`${reply}`);
  } catch(e){
    console.log(e.stack);
  }
}

module.exports.help = {
  name: "block"
}