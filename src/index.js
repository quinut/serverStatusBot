const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require('./config.json');


// const mcAPI = 'https://mcapi.us/server/status?ip=';
const mcsrvstat = 'https://api.mcsrvstat.us/3/';


const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.commands = new Collection();

const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs. readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] ${filePath}에 "data"나 "execute"가 없습니다.`);
		}
	}
}

let alreadyOn;
client.once(Events.ClientReady, async readyClient => {
	console.log(`Logged in as ${readyClient.user.tag}`);

	alreadyOn = await isServerOn('quinut.kro.kr');


	//	반복
	setInterval(() => {
		checkServer('quinut.kro.kr');
	}, 5000);
});


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);


	if (!command) {
		console.error(`${interaction.commandName}은 존재하지 않습니다.`);
		return;

	}

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);

		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: '커맨드 실행에 실패했습니다!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: '커맨드 실행에 실패했습니다!', ephemeral: true });
		}
	}
});


client.login(token);
async function isServerOn(domain) {
	const response = await fetch(`${mcsrvstat}${domain}`);
	const data = await response.json();

	if (data.online) {
		return true;
	}
	else {
		return false;
	}
}
function checkServer(domain) {
	console.log('Checking!');

	fetch(`${mcsrvstat}${domain}`)
		.then(response => response.json())
		.then(data => {
			if (data.online == 1 && alreadyOn == 0) {
				const version = data.version;
				const protocol = data.protocol.name;
				const serverVersion = (data.debug.ping) ? protocol : version;

				const statusEmbed = new EmbedBuilder()
					.setColor('#57F287')
					.setTitle(domain)
					.setURL(`https://mcsrvstat.us/server/${domain}`)
					.setAuthor({ name: '온라인', iconURL: 'https://github.com/quinut/serverStatusBot/blob/main/image/%2357F287.png?raw=true', url: 'https://discord.gg' })
					.setDescription('서버가 켜졌습니다.')
					// .setThumbnail('')
					.addFields(
						{ name: '서버 버전', value: serverVersion, inline: true },
					);
				client.channels.cache.get('848435018241277955').send({ embeds: [statusEmbed] });
				alreadyOn = 1;
				console.log('Server On!');

			}

			else if (data.online == 0 && alreadyOn == 1) {
				const statusEmbed = new EmbedBuilder()
					.setColor('#ED4245')
					.setTitle(domain)
					.setURL(`https://mcsrvstat.us/server/${domain}`)
					.setAuthor({ name: '오프라인', iconURL: 'https://github.com/quinut/serverStatusBot/blob/main/image/%23ED4245.png?raw=true', url: 'https://discord.gg' })
					.setDescription('서버가 꺼졌습니다.');
				client.channels.cache.get('848435018241277955').send({ embeds: [statusEmbed] });
				alreadyOn = 0;
				console.log('Server OFF');
			}
			else {
				console.log(`No Changes! (data.online: ${data.online}, alreadyOn: ${alreadyOn})`);
			}
		});
}

