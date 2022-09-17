const mineflayer = require('mineflayer')
const Discord = require('discord.js')
const bridgeHelper = require('codys-bridge-helper');


var options = {
    host: "serverip",
    port: 25565,
    version: "1.12.2",
    auth: 'microsoft',
    username: "email",
};

function startBot() {
    const bot = mineflayer.createBot(options)


//discord bot
   const client = new Discord.Client({ intents: ["513"] })
    bot.loadPlugin(bridgeHelper)

bot.on('bridgeHelper', function (username, message, color) {
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(message, `https://mc-heads.net/avatar/${username}`)
    client.channels.cache.get('discordserverchannelid').send(embed)
})

client.login('discordbottoken')

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! bridge online`);
  });


client.on("message", message => {
    if (message.channel.id != 'discordserverchannelid') return;
    if (message.author.bot) return;
    bot.chat(`[${message.author.tag}] ${message.content}`)

})

  
  //kick reasons and auto reconnect
        bot.on('kicked', console.log)

    bot.on('login', function () {
        console.log('Bot is online!')
    })

    bot.on('end', function (reason) {
        console.log(`Bot ended. Reason: ${reason}`)
        setTimeout(startBot, 30000);
    })
    bot.on('error', function (err) {
        console.log(`Error: ${err}`)
        setTimeout(startBot, 30000);
    })}

startBot()
