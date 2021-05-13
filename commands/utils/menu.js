const { Command } = require('discord.js-commando');

const discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js')
const { Menu } = require('discord.js-menu')
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'menu',
			
			group: 'utils',
			memberName: 'menu',
			description: 'メニューを開きます',
      
		});
	}
  

  run(message) {
    
    
    
    let helpMenu = new Menu(message.channel, message.author.id, [
        // Each object in this array is a unique page.
        {
            // A page object consists of a name, used as a destination by reactions...
            name: 'main',
            // A MessageEmbed to actually send in chat, and...
            content: new MessageEmbed({
              author: {
                name: "お呼びですか？なんでもお申し付けください♪",
                url: "", // nameプロパティのテキストに紐付けられるURL
                icon_url: "https://cdn.discordapp.com/avatars/786493529639747595/10ff2041a5ee4939e8571e45e61b1d4e.webp"
                 },
                title: 'メニュ～1/2',
                description: ':one:俺）コマンドの一覧が知りたいな',
                footer: {
                text: "❎:閉じる\n▶:次のページ"
                },
                color: 0xF6ADC6,
            }),
            // A set of reactions with destination names attached.
            // Note there's also special destination names (read below)
            reactions: {
                '1️⃣': 'command',
                '❎': 'delete',
                '▶': 'extra',
                 '😀': async() => {
                        // You can run whatever you like in functions.
                        message.channel.send("そこは何でもありませんよ～")
                          .then(msg => {
                          msg.delete({ timeout: 5000 })
                          })
                          .catch();
                     
                        
                    }
                
            }
        },
        {
            name: 'extra',
            content: new MessageEmbed({
                author: {
                name: "次のページですよ～",
                url: "", // nameプロパティのテキストに紐付けられるURL
                icon_url: "https://cdn.discordapp.com/avatars/786493529639747595/10ff2041a5ee4939e8571e45e61b1d4e.webp"
                 },
                title: 'メニュ～2/2',
                description: '何もありません...\nかみんぐすーん！',
                footer: {
                text: "❎:閉じる\n◀:前のページ"
                },
                color: 0xF6ADC6,
                
            }),
            reactions: {
                '❎': 'delete',
                '◀': 'first'
            }
        },
      {
            name: 'command',
            content: new MessageEmbed({
                author: {
                name: "コマンドの一覧です♪",
                url: "", // nameプロパティのテキストに紐付けられるURL
                icon_url: "https://cdn.discordapp.com/avatars/786493529639747595/10ff2041a5ee4939e8571e45e61b1d4e.webp"
                 },
                title: 'コマンド 1/1',
                description: 'コマンド一覧表',
                footer: {
                text: "❎:閉じる\n🏠:メインメニューへ"
                },
                color: 0xF6ADC6,
                fields: [
      {
        name: "/m say (言わせたいこと)",
        value: "恥ずかしがり屋さんなご主人様のために私が代弁しますね♪"
      },
      {
        name: "/m edit",
        value: "!m sayで発言した内容を訂正します。\nまだ使えません"
      },
      {
        name: "/m vote",
        value: "投票の時間です！"
      },
      {
        name: "/m clear",
        value: "お掃除の時間です♪メッセージを一掃します"
      },
      {
        name:"/m omikuji",
        value:"ご主人様！おみくじ、引いてみませんか？"
      },
    ]
                
            }),
            reactions: {
                '❎': 'delete',
                '🏠': 'first',
                
            }
            
            
            
      }
        // The last parameter is the number of milliseconds you want the menu to collect reactions for each page before it stops to save resources
        // The timer is reset when a user interacts with the menu.
        // This is optional, and defaults to 180000 (3 minutes).
    ], 300000)
    // Run Menu.start() when you're ready to send the menu in chat.
    // Once sent, the menu will automatically handle everything else.
    helpMenu.start()

	}

  
  
  
};
