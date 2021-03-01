export default class NotAServer {

	constructor() {
		this.initNotAServer();
	}

	initNotAServer() {
		if (window.localStorage.getItem('notAServer')) {return;}
		window.localStorage.setItem("notAServer", JSON.stringify({
			messages: [
				{
					sender: 'andrew_s',
					recipient: 'guild_education',
					timestamp: Date.now(),
					message: "I hope you like my app!"
				},
				{
					sender: 'guild_education',
					recipient: 'andrew_s',
					timestamp: Date.now() + 30000,
					message: "I'm taking a look now"
				}
			]
		}));
	}

	addMessage(message) {
		let storage = this.getMyDB();
		storage.messages.push(message);
		this.saveMyDB(storage);
	}

	fetchMessagesForUser(id) {
		let storage = this.getMyDB();
		return storage.messages.filter( message => {
			return message.sender === id || message.recipient === id;
		});
	}

	getMyDB() {
		return JSON.parse(window.localStorage.getItem('notAServer' ));
	}

	saveMyDB(json) {
		window.localStorage.setItem('notAServer', JSON.stringify(json));
	}

	clearMyDB() {
		window.localStorage.removeItem('notAServer');
	}
}
