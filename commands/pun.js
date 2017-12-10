const jokes = require("../resources/jokes.json");

module.exports.run = async (bot, message, args) => {
  try{
    let number = Math.floor(Math.random() * jokes.length);
    message.channel.send(jokes[number]);
  } catch(err){
    console.log(err.stack);
  }
}

module.exports.help = {
  name: "pun",
  usage: "`pun",
  about: "Prints out a short joke."
}