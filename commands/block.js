const emojis = require("../resources/emoji.json")

module.exports.run = async (bot, message, args) => {
  try{
    let reply = ""; 
    let content = ""; 
    args.forEach((word) => {
      content += word + " "
    })
    content.split('').forEach((letter) => {
      let code = letter.charCodeAt();
      if ((code > 47 && code < 58) || // numeric (0-9)
          (code > 64 && code < 91) || // upper alpha (A-Z)
          (code > 96 && code < 123) || // lower alpha (a-z)
          (code === 32)) { // space
            reply += emojis[letter.toUpperCase()]+' ';    
      }
    })
    message.channel.send(`${reply}`);
  } catch(err){
    console.log(err.stack);
  }
}

module.exports.help = {
  name: "block",
  usage: "`block <text>",
  about: "Enter a combination of numbers and letters and have it emojified."
}