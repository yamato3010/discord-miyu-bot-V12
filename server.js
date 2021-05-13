const http = require('http');
const querystring = require('querystring');
const {discord,MessageEmbed} = require('discord.js');
const { Menu } = require('discord.js-menu');
//const Discord = require('discord.js');
//const client = new discord.Client();
//const noticeChannelId = [786526388836368404];
const Commando = require('discord.js-commando');
const voiceChannelNotice = "786526388836368404";
const cmd = require('discord.js-commando');
const path = require('path');
const config = require( path.resolve( __dirname, "config.json" ) );
const client = new cmd.CommandoClient({
    commandPrefix: config.prefix,
    unknownCommandResponse: false
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['utils', 'ユーティリティ'],
        ['fun', '遊び'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

//通話通知

client.on('voiceStateUpdate', (oldMember, newMember) => {
       let newUserChannel = newMember.channelID;
       let oldUserChannel = oldMember.channelID;
    
       if(newUserChannel != "791532869792825364") 
       { 
           
         
         
           console.log("Joined vc with id "+newUserChannel);
         if(newMember.member.client.channels.cache.get(newUserChannel).members.filter(member=>!member.user.bot).size == 1){
         newMember.channel.createInvite()
            .then(invite => sendMsg(
            voiceChannelNotice, "<@" + newMember.id +"> 様が通話を開始されました！\n 皆さんもぜひご参加ください！\n <@&787293332547043398> \n" + invite.url
          ))
           
           
         }
       }
       else{
           
           console.log("Left vc");
       }
    });


client.on('ready', () => {
  console.log(`${client.user.tag}としてログインしました！`);
  client.user.setActivity(config.activity);
});

http.createServer(function(req, res){
  if (req.method == 'POST'){
    var data = "";
    req.on('data', function(chunk){
      data += chunk;
    });
    req.on('end', function(){
      if(!data){
        res.end("No post data");
        return;
      }
      var dataObject = querystring.parse(data);
      console.log("post:" + dataObject.type);
      if(dataObject.type == "wake"){
        console.log("はっ！危ない寝ちゃうところだった...");
        res.end();
        return;
      }
      res.end();
    });
  }
  else if (req.method == 'GET'){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Discord Bot is active now\n');
  }
}).listen(3000);

client.login( process.env.DISCORD_BOT_TOKEN );

client.on('ready', message =>{
  console.log('Bot準備完了～お仕事頑張りますよっ！');
  //client.user.setPresence({ game: { name: '!m | 精一杯ご奉仕いたしますね♪' } });
});


// List of available statuses
let statuses = [
    `コマンドがわからなくなったら/m menuですっ`,
    `精一杯ご奉仕いたしますね♪`,
    'discord.js V12 アップデート完了ですっ!'
    //{game: {name: `お仕えさせていただきます！`}, type: "PLAYING"}
];

let i = 0;
// 15秒ごとに更新
setInterval(() => {
     // Get the status
     let status = statuses[i];
     // If it's undefined, it means we reached the end of the array
     if(!status){
         // Restart at the first status
         status = statuses[0];
         i = 0;
     }
     client.user.setActivity(status);
     i++;
}, 10000);


client.on("guildMemberAdd", (member) => {

    let channel = client.channels.cache.get('787269819158102036');
    console.log(`${member.user} さんが参加したみたい...`); 
    channel.send(`おかえりなさいませ ${member.user}様！ ようこそPON WORLDへ！！\n <#786613511643332639>を御一読ください！ \n そのあと<#786897885286629387>でロール設定をお願いしますっ \n 何かわからないことがあったら <@&785532756800438303> ロールのついている人にDMをお願いします。`); 
});


client.on('message', message =>{
  if (message.author.id == client.user.id || message.author.bot){
    return;
  }
  if(message.mentions.has(client.user)){
    sendReply(message, "呼びましたか？");
    return;
  }
  if (message.content.match(/にゃ～ん|にゃーん/)){
    let text = "にゃ～ん♪";
    sendMsg(message.channel.id, text);
    return;
  }
  
  if (message.content==="は？"){
    const gomen = ()=>{
      const text = "なんか...ごめんなさい...";
      sendMsg(message.channel.id, text);
    };
    const text = "は？";

    sendMsg(message.channel.id, text);
    setTimeout(gomen,5000);
    return;

  }
  
  if (message.content.match("/m omikuji")){
    let arr = ["おめでとうございます！大吉です！！いいことありそうです♪", "吉ですっ。悪くないと思います♪", "き、凶です...大丈夫です。ランダムで出しているだけなので...", "（おみくじはない！！）", "あれ？出てきませんね...", "(からっぽ！！)"];
    lottery(message.channel.id, arr);
    return;
  }
  
  if (message.content.startsWith("/m say")) {
      message.delete({ timeout: 0 })
      message.channel.send(message.content.slice(6, message.content.length));
      //六文字以降を消してる？？
      
   }
  
  if (message.content==="/dissoku up!"){
    if (!message.member.hasPermission("ADMINISTRATOR")){
    //let text = "dissoku upありがとうございます！！"
    //sendReply(message, `bumpをありがとうございます！！ \nまた宜しければよろしくお願いします♪`);
    let arr = ["dissoku upをありがとうございます！！ \nまた宜しければよろしくお願いします♪","dissoku upしてくださりありがとうございます！とっても嬉しいですっ","ありがとうございます！一緒にこのサーバーを有名にしていきましょうね♪"];
    lotteryReply(message, arr);
      return;
    }
    else{
      let arr = "お疲れ様です♪"
      sendReply(message,arr);
      return;
    };
    return;
    
  }
  
  
  if (message.content.match("死ね")){
    message.channel.send("死ねはよくないです...")

  }


  
  
if (message.content==="!d bump"){
  if (!message.member.hasPermission("ADMINISTRATOR")){
    //let text = "dissoku upありがとうございます！！"
    //sendReply(message, `bumpをありがとうございます！！ \nまた宜しければよろしくお願いします♪`);
    let arr = ["bumpをありがとうございます！！ \nまた宜しければよろしくお願いします♪","bumpしてくださりありがとうございます！とっても嬉しいですっ","ありがとうございます！一緒にこのサーバーを有名にしていきましょうね♪"];
    lotteryReply(message, arr);
    return;
  }
  else{
    let arr = "いつもお疲れ様です♪"
      sendReply(message,arr);
    return;
  };
  }
  
  
});






if(process.env.DISCORD_BOT_TOKEN == undefined){
 console.log('DISCORD_BOT_TOKENが設定されていません。');
 process.exit(0);
}



function sendReply(message, text){
  message.reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option={}){
  client.channels.cache.get(channelId).send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}

function lottery(channelId, arr){
  let random = Math.floor( Math.random() * arr.length);
  sendMsg(channelId, arr[random]);
}

function lotteryReply(message, arr){
  let random = Math.floor( Math.random() * arr.length);
  sendReply(message, arr[random]);
}