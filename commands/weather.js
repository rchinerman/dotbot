const Discord = require("discord.js");
const config = require("../config");
const fetch = require("node-fetch");
const icons = require("../resources/weather_icons.json");
const WEATHER_KEY = config.weather.dark_sky_api;
const MAPS_API = config.weather.google_maps_api;

module.exports.run = async (bot, message, args) => {
  try{
    let address = args.join(" ")
    let mapsUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    let weatherUrl = "https://api.darksky.net/forecast/";

    fetch(`${mapsUrl}${address}&key=${MAPS_API}`).then((res, err) => {
      return res.json();
    }).then((res) => {
      let coords = res.results[0].geometry.location
      let location = res.results[0].formatted_address;      
      fetch(`${weatherUrl}${WEATHER_KEY}/${coords.lat},${coords.lng}`).then((res, err) => {
        return res.json();
      }).then((res) => {
        let current = res.currently;
        let summary = res.minutely.summary;
        let forecast = res.daily.summary;

        const embed = new Discord.RichEmbed()
          .setDescription(`**${summary}**`)
          .setAuthor(`Weather for ${location}`)
          .setThumbnail(`${icons[current.icon]}`)
          .setColor(523423)
          .addField("Temperature", `${current.temperature}\u00B0F`, true)
          .addField("Feels Like", `${current.apparentTemperature}\u00B0F`, true)
          .addField("Winds", `${current.windSpeed}mph`, true)
          .addField("Humidity", `${current.humidity}%`, true)
          .addField("Chance of Rain", `${current.precipProbability}%`, true)
          .addField("Forecast", `${forecast}`)
        
        message.channel.send({embed: embed});
    })})} catch(err){
    console.log(err.stack);
  }
}

module.exports.help = {
  name: "weather",
  usage: ".weather <address or city>",
  about: "Prints out weather forecast for specified location."
}