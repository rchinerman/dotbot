const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  try{
    fs.readdir("./commands", (err, files) => {    
      let jsfiles = files.filter(f => f.split(".").pop() === "js");  
      jsfiles.forEach((f) => {
        let props = require(`./${f}`);
        message.channel.send(`\`${props.help.name}: ${props.help.about}`);
      });
    });
  } catch(err){
    console.log(err.stack);
  }
}

module.exports.help = {
  name: "help",
  about: "Prints out a short message describing each command."
}