'use strict';

const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
    console.log('QR Code received, scan the code to log in:', qr);
});

client.on('authenticated', () => {
    console.log('Successfully authenticated!');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    if (message.body === '!ping') {
        await message.reply('pong');
    } else if (message.body.startsWith('!echo ')) {
        const response = message.body.slice(6);
        await message.reply(response);
    }
});

client.initialize();
