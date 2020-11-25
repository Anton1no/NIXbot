const Discord = require('discord.js');
const bot = new Discord.Client();
const token = "Nzc5NTI3MTgzMjMyMTM5MjY0.X7h1Qw.oaWRDRryYKoQntBbjNajbj65y_g";

bot.once('ready', () =>{
    console.log(`${bot.user.tag} online!!!`);
    bot.user.setActivity('Seu pai de lingerie', { type: 'WATCHING' });
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'bem-vindos');
    if (!channel) return;
    channel.send(`Bem Vindo ao ${member.guild.name}! Você é um novo(a) nix, ${member}. Arrombado(a)!`);
});

bot.on('message', msg => {
    if (msg.content === "duda") {
        msg.channel.send('Eu te amo mb!!! Ass: Gustavo F.');
    }

    if (msg.content === "meu avatar") {
        msg.channel.send(msg.author.displayAvatarURL());
    }
});

bot.login(token);