const Discord = require("discord.js");
const config = require("../config");
const fetch = require("node-fetch");
const KEY = config.weather.open_api;

module.exports.run = async (bot, message, args) => {
  try{
    let city = args.join(" ")
    let url = "http://api.openweathermap.org/data/2.5/weather?q=";
    let keyIs = "&appid=";
    let units = "&units=imperial";

    fetch(`${url}${city}${units}${keyIs}${KEY}`).then((res, err) => {
      return res.json();
    }).then((res) => {
      if(res.cod === '404'){
        message.channel.send(res.message);
        return;
      }
      let current = res.main;
      let weather = res.weather[0];
      let city = res.name;
      let wind = res.wind;

      const embed = new Discord.RichEmbed()
        .setDescription(`**${weather.description}**`)
        .setAuthor(`Weather for ${city}`)
        //.setThumbnail(current.imageUrl)
        .setColor(523423)
        //.addField("Timezone", `UTC${location.timezone}`, true)
        //.addField("Degree Type", location.degreetype, true)
        .addField("Temperature", `${current.temp}\u00B0F`, true)
        //.addField("Feels Like", `${location.feelslike} Degrees`, true)
        .addField("Winds", `${wind.speed}mph`, true)
        .addField("Humidity", `${current.humidity}%`, true)
      
      message.channel.send({embed: embed});  
  })} catch(err){
    console.log(err.stack);
  }
}

module.exports.help = {
  name: "weather",
  usage: ".weather <city>",
  about: "Prints out weather forecast for specified location."
}