const Discord = require("discord.js");
const config = require("../config");
const fetch = require("node-fetch");
const champIds = require("../resources/id_info_dict.json");
const champKeys = require("../resources/key_info_dict.json");
const champRoles = require("../resources/champ_roles.json");
const CHAMPGG_KEY = config.league.championgg;

module.exports.run = async (bot, message, args) => {
  findKey = (object, key) => {
    return Object.keys(object).find(k => k.toLowerCase() === key.toLowerCase());
  };

  if(args.length === 0){
    message.channel.send("Please supply a champion name after the '.champ' command.");
    return;
  }
  try{
    let championEntered = args.join(" ").replace(/[^A-Za-z]/g,'');
    let url = "http://api.champion.gg/v2/champions/";
    //let elo = "";
    let championKey = findKey(champKeys, championEntered);
    //let sort = "playRate-desc";
    let championId = champKeys[championKey].id;
    //let limit = "1";
    let imgUrl = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/";

    //fetch(`${url}${championId}?elo=${elo}&limit=${limit}&api_key=${CHAMPGG_KEY}`).then((res, err) => {
    
    fetch(`${url}${championId}?&api_key=${CHAMPGG_KEY}`).then((res, err) => {
      return res.json();
    }).then((res) => {
      const embed = new Discord.RichEmbed()
        .setDescription(`${champIds[championId].title}`)
        .setAuthor(`${champIds[championId].name}`)
        .setThumbnail(`${imgUrl}${champIds[championId].key}.png`)
        .setColor(523423)
        .setFooter(`Stats from Champion.gg | Patch ${res[0].patch} | Platinum+`)
        res.forEach((role, i) => {
          if(i>0){embed .addBlankField()}         
            embed.addField("Role", `${champRoles[role.role]}`, true)
                 .addField("Win Rate", `${(role.winRate*100).toFixed(2)}%`, true)
                 .addField("Play Rate", `${(role.playRate*100).toFixed(2)}%`, true)
                 .addField("Ban Rate", `${(role.banRate*100).toFixed(2)}%`, true)               
                 .addField("Games Played", `${role.gamesPlayed}`, true)
                 .addField("Role Popularity", `${(role.percentRolePlayed*100).toFixed(2)}%`, true)
      })
        
      message.channel.send({embed: embed});
    })} catch(err){
      message.channel.send("Champion not found, please try again.");
      console.log(err.stack);
  }
}

module.exports.help = {
  name: "champ",
  usage: ".champ <name>",
  about: "Prints out stats for specified champion from Champion.gg."
}