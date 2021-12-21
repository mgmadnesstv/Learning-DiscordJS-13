module.exports.run = async (interaction) => {

    const text = interaction.options.getString('input');
    await interaction.reply({ content: text, ephemeral: true});
}

module.exports.help = {
    name: 'echo',
    permission: []
}