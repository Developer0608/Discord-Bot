const { Collection } = require('discord.js');
const { createUser, getUser, createService } = require('../../database/userRepository');

class CommandHandler {
    constructor(client) {
        this.client = client;
    }

    init() {
        this.client.commands = new Collection();
        this.client.commands.set('ppcreateuser', {
            execute(message, args) {
                const username = args[0];
                const email = args[1];
                const password = args[2];

                // Call DB
                createUser(username, email, password)
                .then((response) => {
                    console.log("Store the value in DB::", username, email, password);
                    message.reply(response);
                }).catch((err) => {
                    console.log('ERROR ::: ', err);
                })
            }
        });

        this.client.commands.set('ppcreateservice', {
            execute(message, args) {
                const serviceName = args[0];
                const serviceLink = args[1];
                const monthlyFee = args[2];
                const username = args[3];

                createService(serviceName, serviceLink, monthlyFee, username)
                .then((service) => {
                    message.reply(service)
                })
                .catch((err) => {
                    message.reply("Service cannot be created")
                })
            }
        });

        this.client.commands.set('ppgetuser', {
            execute(message, args) {
                const username = args[0];

                // Search in DB and return accordingly
                getUser(username)
                .then((user) => {
                    message.reply(user);
                }).catch((err) => {
                    message.reply("user cannot be found")
                })
            }
        });

        // Event handler for when the bot receives a message
        this.client.on('messageCreate', (message) => {
            const args = message.content.slice(1).trim().split(/ +/);

            const _ = args.shift();
            const command = args.shift().trim().toLowerCase().replace("/", "");

            if (!this.client.commands.has(command)) return; // Ignore unknown commands
        
            try {
                console.log("Executing:::");
                this.client.commands.get(command).execute(message, args); // Execute the command
            } catch (error) {
                console.error(error);
                message.reply('There was an error executing the command.'); // Handle errors gracefully
            }
        });
    }
}

module.exports = CommandHandler;