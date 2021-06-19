const { Command } = require('discord.js-commando');
const discord = require('discord.js');
const weather = require('weather-js');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'weather',
			
			group: 'utils',
			memberName: 'weather',
			description: 'お天気',
      args: [
                {
                    key: 'place',
                    prompt: '天気予報を知りたい地域を教えてください♪',
                    type: 'string',
                    
                }
        ]
		});
	}
  
//コマンドあげの内容
  run(message, {place}) {
  weather.find({search: place, degreeType: 'C'}, function(err, result) {
            if (err) message.channel.send(err);
            if (result.length === 0) {
                message.channel.send(":x: " + "| ごめんなさい・・・\n　　 その場所が見つかりませんでした。"); 
                return; 
            } 
            var current = result[0].current;
            switch(current.skytext){
            case "Mostly Sunny": 
            var skytext = "ほぼ晴れです！";
            break;
            case "Cloudy" :
            var skytext = "曇りです～";
            break;
            case "Partly Cloudy":
            var skytext = "晴れのち曇りです";
            break;
            case "Sunny":
            var skytext = "晴れでーすっ！気持ちいい一日になりそうですね！";
            break;
            case "Clear" :
            var skytext = "雲1つない快晴です！やった～";
            break;
            case "Mostly Clear":
            var skytext = "ほぼ快晴です！";
            break;
            case "Mostly Cloudy":
            var skytext = "ほぼ曇りです。";
            break;
            case "Partly Sunny":
            var skytext = "所により晴れです";
            break;
            case "Light Rain":
            var skytext = "小雨です、、、";
            break;
            default:
            var skytext = current.skytext;
            break
            }
            const embed = new discord.MessageEmbed()
                .setDescription('**' + skytext + '**') 
                .setAuthor(`${current.date}の${current.observationpoint}の天気`) 
                .setThumbnail(current.imageUrl) 
                .addField('温度',`${current.temperature}℃`, true)
                .addField('体感温度', `${current.feelslike}℃`, true)
                .addField('風',current.winddisplay, true)
                .addField('湿度', `${current.humidity}%`, true);
            message.channel.send(embed);
        });
	}

  
  
  
};
