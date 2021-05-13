const { Command } = require('discord.js-commando');
const discord = require('discord.js');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clear',
			
			group: 'utils',
			memberName: 'clear',
			description: 'お掃除の時間です♪メッセージを一掃します',
      args: [
                {
                    key: 'messagecount',
                    prompt: 'いくつ消しますか？',
                    type: 'integer',
                    
                }
        ]
      
		});
	}
  
//コマンドの内容
  run (message, {messagecount}) {

    let delMsg = messagecount;
    delMsg = delMsg + 3;
    if(message.member.hasPermission("ADMINISTRATOR")) {     ///To allow a simple moderator to use the command just put MANAGE_MESSAGES in place of ADMINISTRATOR 
      //let messagecount = parseInt(args[0]);
    
      if(isNaN(messagecount)) return message.channel.send(":x: " + "| いくつ消したいか教えてもらってません！")
      .then(msg => {
        msg.delete({ timeout: 5000 })
  })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
    
      if(delMsg > 100){
        message.channel.send(":x: " + "| 100以上は消せませんよぉ～")
        //.then(msg => {
        //msg.delete({ timeout: 5000 })
 // })
       // .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
        
      }else if(delMsg < 2 ) {
        message.channel.send(":x: " + "| 2以上じゃないと消せません！")
        //.then(msg => {
      //  msg.delete({ timeout: 5000 })
//  })
        //.catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      } else {
    
      {
        console.log(delMsg); 
        message.channel.messages.fetch({limit: delMsg}).then(messages => message.channel.bulkDelete(messages, true));
        
        message.reply(":broom: " + "|お掃除完了です♪  " + messagecount+"個のメッセージをお掃除しました！")
        .then(msg => {
        msg.delete({ timeout: 5000 })
  })
        .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }}
    } else {
      return message.reply(":x: " + "| ごめんなさい、アドミンロールの人じゃないと使えません。。。")
    }
    

	}

  
  
  
};
