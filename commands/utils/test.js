const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gg')
		.setDescription('마인크래프트 서버의 상태를 확인합니다.')
		.addStringOption(option =>
			option.setName('ip')
				.setDescription('확인할 서버의 IP주소(기본값 quinut.kro.kr'))
		.addNumberOption(option =>
		option.setName('port')
			.setDescription('포트(기본값 25565)')),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const mcIP = interaction.options.get('ip') || "quinut.kro.kr";
		const mcPort = interaction.options.get('port') || 25565;

		let url = `http://mcapi.us/server/status?ip=${mcIP}&port=${mcPort}`;
		
		(async () => {
			try {
				const { online, players } = await fetch(url).then(response => response.json());

				let status = "❌*오프라인*"
				let color = 16711680
				if (online) {
					status = "🟢**온라인**";
					color = 65280
				}

				const embed = {
					"author": {
					"name": `${serverName} Server Status`,
					"url": serverUrl,
					"icon_url": serverLogo
					},
					"color": color,
					"fields": [
					{
						"name": "Status:",
						"value": status,
						"inline": true
					},
					{
						"name": "온라인인 플레이어:",
						"value": `**${players.now}** / **${players.max}**`,
						"inline": true
					}
					],
					"footer": {
					"text": `IP: ${mcIP}, Port: ${mcPort}`
					}
				};
				await interaction.reply({ embed });

			} catch (error) {
				console.log(error);
			}
		})
	},
};
