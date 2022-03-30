const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');
const { token } = require('token.json');

const tam = config.colors;
const rainbow = new Array(tam);

for (var i = 0; i < tam; i++) {
    var ver = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
    var azu = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
    var ved = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg

    rainbow[i] = '#' + ver + ved + azu;
}

function sin_to_hex(i, phase) {
    var sin = Math.sin(Math.PI / tam * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);

    return hex.length === 1 ? '0' + hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
    for (let index = 0; index < servers.length; ++index) {
        let server = bot.guilds.cache.get(servers[index]);
        if (!server) {
            if (config.logging) {
                console.log(`[ColorChanger] Server ${servers[index]} não encontrado.`);
            }
            continue;
        }

        let role = server.roles.cache.find(r => r.name === config.roleName);
        if (!role) {
            if (config.logging) {
                console.log(`[ColorChanger] Cargo ${config.roleName} não encontrado no server ${servers[index]}.`);
            }
            continue;
        }

        role.setColor(rainbow[place]).catch(console.error);

        if (config.logging) {
            console.log(`[ColorChanger] Cor mudada para ${rainbow[place]} no servidor: ${servers[index]}`);
        }
    }

    if (place == (tam - 1)) {
        place = 0;
    } else {
        place++;
    }
}

bot.on('ready', async () => {
    console.log(`Login feito em ${bot.user.username}!`);
    if (config.speed < 60000) {
        process.exit(1);
    }
    setInterval(changeColor, config.speed);
    changeColor();
});

bot.on('message', msg => {
    if(msg.content === "avatar") {
        msg.channel.send(msg.author.displayAvatarURL());
    }
})

bot.login(token);