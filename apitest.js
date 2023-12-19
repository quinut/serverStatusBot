fetch('https://api.mcsrvstat.us/3/quinut.kro.kr')
    .then(response => response.json())
    .then(data => {
      const status = (data.online ? "Online" : "Offline")
      console.log(status);
    })
    .catch(error => {
      interaction.reply({ content: '커맨드 실행에 실패했습니다!', ephemeral: true });
      console.error(error);
    });