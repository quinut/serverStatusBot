//  https://mc-heads.net/skin/<nickname>
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('스킨')
		.setDescription('플레이어의 스킨을 가져옵니다.')
		.addStringOption(option =>
			option
				.setName('nickname')
				.setDescription('플레이어 닉네임 또는 UUID')
				.setRequired(true)),


	async execute(interaction) {
		const mcUser = interaction.options.getString('nickname');
		// const skinImage = await fetch(`https://mc-heads.net/skin/${mcUser}`);
		// await interaction.reply(`${interaction.guild.name} 서버에는 ${interaction.guild.memberCount}명이 있어요! 그것 참 많네요!`);

		const skinEmbed = new EmbedBuilder()
			// .setColor('#ED4245')
			.setTitle(`${mcUser}의 스킨`)
			.setImage(`https://mc-heads.net/skin/${mcUser}`);
			// .setAuthor({ name: '오프라인', iconURL: 'https://github.com/quinut/serverStatusBot/blob/main/image/%23ED4245.png?raw=true', url: 'https://discord.gg' })
			// .setDescription('서버가 현재 오프라인입니다.');

		interaction.reply({ embeds: [skinEmbed] });
	},
};