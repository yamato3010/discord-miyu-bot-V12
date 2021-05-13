const { Command } = require('discord.js-commando');
const discord = require('discord.js');
module.exports = class MeowCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'omikuji',
			
			group: 'fun',
			memberName: 'omikuji',
			description: 'ご主人様！おみくじ、引いてみませんか？',
      
		});
	}
  
//コマンドの内容
  run() {

	}

  
  
  
};
