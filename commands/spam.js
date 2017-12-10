const jokes = require("../resources/jokes.json");

module.exports.run = async (bot, message, args) => {
  try{
    //let interval = setInterval (function (){
    //  jokes.forEach((joke) => message.channel.send(joke));      
    //}, 1000); 
    message.channel.send("Oh heck no.");
  } catch(err){
    console.log(err.stack);
  }
}

module.exports.help = {
  name: "spam",
  usage: "`spam",
  about: "Spams jokes (currently disabled)"
}