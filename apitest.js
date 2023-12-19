fetch('https://api.mcsrvstat.us/3/quinut.kro.kr')
  .then(response => response.json())
  .then(data => {
    console.log(data.players)
  })
  .catch(error => {
    console.error(error);
});




