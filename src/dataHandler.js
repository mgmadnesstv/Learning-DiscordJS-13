async function createCmd(Client, guildId) {
    const data = [

        // Commands
        {

            name: 'echo',
            description: 'Does what you do!',
            options: [{
                name: 'input',
                type: 'STRING',
                description: 'Your Input to reply',
                retuired: true,
            }],
        },

    ]

    const command = await Client.guilds.cache.get(guildId)?.commands.set(data);
}


module.exports = { createCmd }

// 922827474218389606