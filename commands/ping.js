module.exports.run = async (bot, message, args) => {
  try{
    message.channel.send("pong");
  } catch(e){
    console.log(e.stack);
  }
}

module.exports.help = {
  name: "ping"
}