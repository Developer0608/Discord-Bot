const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const token = 'MTE1MjU2ODQzMTU2NTA5MDgxNg.GZSrQz.OHAXPb4ZqBubPm65u7xQ-MVA12lC3mmVTYtSWs';
 
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    const serverName = 'node-discord';
    const server = client.guilds.cache.find((guild) => guild.name === serverName);

    if (!server) {
        console.log(`Server '${serverName}' not found.`);
        return;
    }

    console.log(`Server ID: ${server.id}`);
   
    const channelName = 'general';
    channel = server.channels.cache.find((ch) => ch.name === channelName);

    if (!channel) {
        console.log(`Channel '${channelName}' not found in server '${serverName}'.`);
        return;
    }
    channel.send("/ppcreateuser anand anand@gmail.com anand@123");
    channel.send("/ppgetuser anand")
    channel.send("/ppcreateservice testingService 'https://youtube.com' 3.0 anand")
});


// Log in to Discord using your bot's token
client.login(token);