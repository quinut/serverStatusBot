const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('채널추가')
		.setDescription('서버 온오프 알림을 받을 채널을 추가해요.')
    .addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('메시지를 받을 채널')
				.setRequired(true)),
	async execute(interaction) {
		const newNotiChan = interaction.options.getString('channel');
		await interaction.reply(`${newNotiChan}`);
	},
};