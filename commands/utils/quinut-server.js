const { SlashCommandBuilder, EmbedBuilder, Attachment } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
// const convertBase64ToURL = require('../../base64toURL.js');
//https://discordjs.guide/slash-commands/response-methods.html#deferred-responses
module.exports = {
  data: new SlashCommandBuilder()
    .setName('서버상태')
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

        if (data.online) {
          const onlinePlayer = data.players.online
          const maxPlayer = data.players.max
          const version = data.version
          const protocol = data.protocol.name
          const serverVersion = (data.debug.ping) ? protocol : version


          const attachment = new Attachment('https://i.imgur.com/AfFp7pu.png', 'test.gif');

          const statusEmbed = new EmbedBuilder()
            .setColor("#57F287")
            .setTitle(serverIP)
            .setURL(`https://mcsrvstat.us/server/${serverIP}`)
            .setAuthor({ name: "온라인", iconURL: "https://github.com/quinut/serverStatusBot/blob/main/image/%2357F287.png?raw=true", url: 'https://discord.gg' })
            .setDescription('서버가 온라인입니다.')
            .setThumbnail('attachment://test.gif')
            .addFields(
              { name: '플레이어', value: `${onlinePlayer} / ${maxPlayer}` },
              { name: '\u200B', value: '\u200B' },
              { name: '서버 버전', value: serverVersion, inline: true },
              { name: 'Inline field title', value: 'Some value here', inline: true },
            )

            interaction.editReply({ embeds: [statusEmbed] });
        } else {
          const statusEmbed = new EmbedBuilder()
            .setColor("#ED4245")
            .setTitle(serverIP)
            .setURL(`https://mcsrvstat.us/server/${serverIP}`)
            .setAuthor({ name: "오프라인", iconURL: "https://github.com/quinut/serverStatusBot/blob/main/image/%23ED4245.png?raw=true", url: 'https://discord.gg' })
            .setDescription('서버가 현재 오프라인입니다.')

            interaction.editReply({ embeds: [statusEmbed] });
      }

      
        
      
		  
    })
    .catch(error => {
      interaction.editReply({ content: '커맨드 실행에 실패했습니다!', ephemeral: true });
      console.error(error);
    });
  }
}

