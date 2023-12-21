const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('서버')
		.setDescription('서버 멤버가 몇 명인지 알려줘요!'),
	async execute(interaction) {
		await interaction.reply(`${interaction.guild.name} 서버에는 ${interaction.guild.memberCount}명이 있어요! 그것 참 많네요!`);
	},
};