const Discord = require('discord.js');
const {Client, Attachment} = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bot = new Client();
const token = "";
const PREFIX = '';
const version = '1.3.3';

var apilink = 'http://api.etf2l.org/';
var player = 'player/';
var id = '14782';
var jsonlast = '.json';

var url = apilink + player + id +jsonlast;

function loadJSON(path, success, message)
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var apiData = JSON.parse(xhr.responseText);
            success(apiData, message);
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function setFields (etf2l, message) {
    let playerEmbed = new Discord.RichEmbed()
    .setTitle('ETF2L Player Information')
    .setColor('DARK_GOLD')
    .addField('Name:', etf2l.player.name)
    .addField('Country:', etf2l.player.country)
    .addField('SteamID:', etf2l.player.steam.id3)
    .setThumbnail(etf2l.player.steam.avatar);
    var teams = "\n";
    etf2l.player.teams.forEach(function(team) {
        teams += team.name + '[' + team.type + ']\n';
    });
    playerEmbed.addField('Current teams joined:', teams);

    message.channel.send(playerEmbed);
}
bot.on('message', message => {

    // organizing the messages for the bot.
    let userMessage = message.content.substring(PREFIX.length).split(" ");

    if (userMessage[0] === 'gaeta'){
      switch (userMessage[1]){
        case 'player':
            if (userMessage[2] === undefined) {
                    message.channel.send("Please provide ID too");
            } else {
                url = 'http://api.etf2l.org/player/' + userMessage[2] + '.json'
                loadJSON(url, setFields, message);
            }
        break;
          
      }
    }
});

bot.once('ready', () => {
    console.log('Bot is activated.')

    //Setting an activity for the bot to be seen "Watching you"
    bot.user.setActivity('you', {type: 'WATCHING'}).catch(console.error);
})

//Logging in by using the token above
bot.login(token);