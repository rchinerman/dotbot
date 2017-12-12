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
    let championEntered = args[0].replace(/[^A-Za-z]/g,'');
    let address = args.join(" ")
    let url = "http://api.champion.gg/v2/champions/";
    let elo = "SILVER";
    let championKey = findKey(champKeys, championEntered);
    let championId = champKeys[championKey].id;
    let limit = "1";
    let imgUrl = "http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/";

    fetch(`${url}${championId}?elo=${elo}&limit=${limit}&api_key=${CHAMPGG_KEY}`).then((res, err) => {
      return res.json();
    }).then((res) => {
      const embed = new Discord.RichEmbed()
        .setDescription(`${champIds[championId].title}`)
        .setAuthor(`${champIds[championId].name} - ${champRoles[res[0].role]}`)
        .setThumbnail(`${imgUrl}${champIds[championId].key}.png`)
        .setColor(523423)
        .addField("Win Rate", `${(res[0].winRate*100).toFixed(2)}%`, true)
        .addField("Play Rate", `${(res[0].playRate*100).toFixed(2)}%`, true)
        .addField("Games Played", `${res[0].gamesPlayed}`, true)
        .addField("Ban Rate", `${(res[0].banRate*100).toFixed(2)}%`, true)
        
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