const emojis = require("../resources/emoji.json");

module.exports.run = async (bot, message, args) => {
  try{
      let text = message.content.match(/"[^"]+"/g);
      let noQuotes = text.map((entry) => {
        return entry.replace(/"/g,"");
      });
      let questions = noQuotes.slice(1).map((entry, i) => {
        return {"name": emojis[i+1] + " " + entry, "value": "\u200B", inline: true}
      })
      if(questions.length > 9){
        message.channel.send("No more than 9 answers");
        return;
      }
      message.channel.send({embed: {
        color: 3447003,
        title: noQuotes[0],
        description: "Asked by " + message.author, 
        fields: questions     
      }});
  } catch(err){
    console.log(err.stack);
  }
}

module.exports.help = {
  name: "poll",
  usage: ".poll \"Question\" \"Option 1\" \"Option 2\" etc. Quotes are required.",
  about: "Prints out a short message describing each command."
}