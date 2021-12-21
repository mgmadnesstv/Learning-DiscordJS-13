const Client = require("../bot").Client;
const { createCmd } = require('../dataHandler');
Client.on('ready', async () => {
    Client.user.setPresence({activities: [{ name: "EnvySMP", type: "WATCHING"}]});
    console.log(`${Client.user.tag} is online`)

    createCmd(Client, '922827474218389606')

});