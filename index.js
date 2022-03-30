const Discord = require('discord.js');
const bot = new Discord.Client();
const { token } = require('token.json');

bot.login(token);

bot.once('ready', () =>{
    console.log(`${bot.user.tag} online!!!`);
    bot.user.setActivity('THE BATMAN', { type: 'WATCHING' });
});

var frutas = new Array();

bot.on('message', async msg => {
    if (msg.content === "!!game") {
        msg.guild.channels.create((msg.author.username),{
            type: 'text',
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: msg.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
            ],
        })
        .then((channel) => {
            channel.setParent('793593979203354664')
            frutas.push(channel.id)
            console.log(frutas)
            channel.overwritePermissions([
                {
                    id: msg.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: msg.author.id,
                    allow: ['VIEW_CHANNEL'],
                },
              ]);
        })
    }
})

//300000ms = 5 minutos

function limpar() {
    var i
    var tam = frutas.length
    var fetchedChannel
    if (tam > 0) {
        for (i = 0; i < tam; i++) {
            channel.delete()
        }
        //console.log("foi feita a limpeza de"+ tam +"canais" )
        frutas = new Array();
    }
}
setInterval( limpar, 3000);