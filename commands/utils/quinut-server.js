const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
//https://discordjs.guide/slash-commands/response-methods.html#deferred-responses
module.exports = {
  data: new SlashCommandBuilder()
    .setName('퀴넛서버')
    .setDescription('퀴넛서버를 확인해요!')
    .addStringOption(option =>
			option
				.setName('ip')
				.setDescription('서버의 주소를 쓰세요.')),
    // .addStringOption(option =>
    //   option.setName('IP')
    //     .setDescription('상태를 확인할 서버의 IP주소')),
  async execute(interaction) {
    await interaction.deferReply();
    await wait(4000);
    const serverIP = interaction.options.getString('ip') ?? 'quinut.kro.kr';
    await fetch(`https://api.mcsrvstat.us/3/${serverIP}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const status = (data.online ? "🟢**온라인**" : "❌*오프라인*")
      const color = (data.online ? "#57F287" : "#ED4245")



      const statusEmbed = new EmbedBuilder()
        .setColor(color)
        .setTitle(serverIP)
        .setURL(`https://mcsrvstat.us/server/${serverIP}`)
        .setAuthor({ name: status, iconURL: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg', url: 'https://discord.gg' })
        .setDescription('설명')
        
      
		  interaction.editReply({ embeds: [statusEmbed] });
    })
    .catch(error => {
      interaction.reply({ content: '커맨드 실행에 실패했습니다!', ephemeral: true });
      console.error(error);
    });
  }
}
