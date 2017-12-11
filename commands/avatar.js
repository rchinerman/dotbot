module.exports.run = async (bot, message, args) => {
  try{
    let msg = await message.channel.send("Loading...");
    if(args.length === 0){
      console.log(message.author.displayAvatarURL);
      await message.channel.send({files: [
        {
          attachment: message.author.displayAvatarURL,
          name: "avatar.png"
        }
      ]})
    }
    else if (args.length === 1){
      try{
        let user = await bot.fetchUser(args[0].slice(2,-1));
          await message.channel.send({files: [
            {
              attachment: user.displayAvatarURL,
              name: "avatar.png"
            }
          ]})
      } catch(err){
        message.channel.send("Please ensure you entered a user correctly.");        
        console.log(err.stack);
      }
    }
    else{
      message.channel.send("Please enter no more than one user.");
    }
    msg.delete();
  } catch(err){
    console.log(err.stack);
  }
};

module.exports.help = {
  name: "avatar",
  usage: ".avatar <optional name>",
  about: "Posts the user's profile picture."
}