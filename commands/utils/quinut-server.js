const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('서버상태')
		.setDescription('퀴넛서버를 확인해요!')

		.addSubcommand(subcommand =>
			subcommand
				.setName('퀴넛')
				.setDescription('퀴넛서버를 확인합니다.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('태롤')
				.setDescription('태롤서버를 확인합니다.'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('도메인')
				.setDescription('서버 도메인을 직접 입력합니다.')
				.addStringOption(option =>
					option
						.setName('domain')
						.setDescription('서버 도메인')
						.setRequired(true))),


	async execute(interaction) {
		await interaction.deferReply();
		await wait(4000);
		let serverIP;
		const subCommand = interaction.options.getSubcommand();

		switch (subCommand) {
		case '퀴넛':
			serverIP = 'quinut.kro.kr';
			break;
		case '태롤':
			serverIP = 'tjbbak.kro.kr';
			break;
		case '도메인':
			serverIP = interaction.options.getString('domain');
			break;
		default:
			serverIP = 'quinut.kro.kr';


		}
		await fetch(`https://api.mcsrvstat.us/3/${serverIP}`)
			.then(response => response.json())
			.then(data => {


				if (data.online) {
					const onlinePlayer = data.players.online;
					const maxPlayer = data.players.max;
					const version = data.version;
					const protocol = data.protocol.name;
					const serverVersion = (data.debug.ping) ? protocol : version;


					const statusEmbed = new EmbedBuilder()
						.setColor('#57F287')
						.setTitle(serverIP)
						.setURL(`https://mcsrvstat.us/server/${serverIP}`)
						.setAuthor({ name: '온라인', iconURL: 'https://github.com/quinut/serverStatusBot/blob/main/image/%2357F287.png?raw=true', url: 'https://discord.gg' })
						.setDescription('서버가 온라인입니다.')
					// .setThumbnail('')
						.addFields(
							{ name: '플레이어', value: `${onlinePlayer} / ${maxPlayer}` },
							{ name: '\u200B', value: '\u200B' },
							{ name: '서버 버전', value: serverVersion, inline: true },
							{ name: 'Inline field title', value: 'Some value here', inline: true },
						);

					interaction.editReply({ embeds: [statusEmbed] });
				}
				else {
					const statusEmbed = new EmbedBuilder()
						.setColor('#ED4245')
						.setTitle(serverIP)
						.setURL(`https://mcsrvstat.us/server/${serverIP}`)
						.setAuthor({ name: '오프라인', iconURL: 'https://github.com/quinut/serverStatusBot/blob/main/image/%23ED4245.png?raw=true', url: 'https://discord.gg' })
						.setDescription('서버가 현재 오프라인입니다.');

					interaction.editReply({ embeds: [statusEmbed] });
				}


			})
			.catch(error => {
				interaction.editReply({ content: '커맨드 실행에 실패했습니다!', ephemeral: true });
				console.error(error);
			});
	},
};

