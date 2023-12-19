let itIs;


fetch('https://api.mcsrvstat.us/3/quinut.kro.kr')
  .then(response => response.json())
  .then(data => {
    constIt(data);
  })
  .catch(error => {
    interaction.reply({ content: '커맨드 실행에 실패했습니다!', ephemeral: true });
    console.error(error);
});




function constIt(a) {
  itIs = a
}

console.log(itIs);