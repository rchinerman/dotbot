module.exports.run = async (bot, message, args) => {
  try{
    let msg = await message.channel.send("Loading...");
    await message.channel.send({files: [
      {
        attachment: message.author.displayAvatarURL,
        name: "avatar.png"
      }
    ]})
    msg.delete();
  } catch(err){
    console.log(err.stack);
  }
};

module.exports.help = {
  name: "avatar",
  usage: ".avatar",
  about: "Posts the user's profile picture."
}