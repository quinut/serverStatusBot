const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('정보')
		.setDescription('서버에 언제 처음 오셨는지 알려줘요'),
	async execute(interaction) {
		await interaction.reply(`${interaction.user.username}님은 ${interaction.member.joinedAt}에 처음 오셨어요!`);
	},
};