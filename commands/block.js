const emojis = require("../resources/emoji.json")

module.exports.run = async (bot, message, args) => {
  try{
    let reply = ""; 
    let content = ""; 
    args.forEach((word) => {
      content += word + " "
    })
    content.split('').forEach((letter) => {
      reply += emojis[letter.toUpperCase()]+' ';
    })
    message.channel.send(`${reply}`);
  } catch(err){
    console.log(err.stack);
  }
}

module.exports.help = {
  name: "block",
  about: "Enter a combination of numbers and letters and have it emojified."
}