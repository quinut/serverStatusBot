const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('핑')
		.setDescription('"퐁"이라고 대답해요!'),
	async execute(interaction) {
		await interaction.reply('퐁!');
	},
};