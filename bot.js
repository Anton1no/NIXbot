const Discord = require('discord.js');
const bot = new Discord.Client();
const { token } = require('token.json');

bot.once('ready', () =>{
    console.log(`${bot.user.tag} online!!!`);
    bot.user.setActivity('Compartilhe o servidor!!', { type: 'WATCHING' });
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'bem-vindos');
    if (!channel) return;
    channel.send(`Bem Vindo ao ${member.guild.name}! Você é um novo(a) nix, ${member}!`)
});

bot.on('message', msg => {
    if (msg.content === "meu avatar") {
        msg.channel.send(msg.author.displayAvatarURL());
    }
});

bot.login(token);
