let React = require('React');
import notAServer from '../public/notAServer';
import InitAsUser from "./initAsUser";
import Conversations from "./conversations";
import Messages from "./display";
import Sender from "./sender";
import MemoryClear from "./memoryclear";

class RootApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { messages: [], currentUser: '' };

		this.refreshData = this.refreshData.bind(this);
		this.setConversation = this.setConversation.bind(this);
		this.getCurrentConversation = this.getCurrentConversation.bind(this);
		this.setCurrentUser = this.setCurrentUser.bind(this);
		this.getMessages = this.getMessages.bind(this);
		this.getCurrentUser = this.getCurrentUser.bind(this);
		this.store = {
		    setCurrentConversation: this.setConversation,
            setCurrentUser: this.setCurrentUser,
			getCurrentUser: this.getCurrentUser,
			getCurrentConversation: this.getCurrentConversation,
			getMessages: this.getMessages
        }
	}

	getCurrentUser() {
		return this.state.currentUser;
	}

    setCurrentUser(user) {
        this.setState({currentUser: user});
    }

    getMessages() {
		return this.state.messages || [];
	}

    setConversation(name) {
        this.setState({conversation: name});
    }

    getCurrentConversation() {
		return this.state.conversation;
	}

	componentDidMount() {
		this.notAServer = new notAServer();
		this.setState({currentUser: "guild_education"})
		this.setState({messages: this.notAServer.fetchMessagesForUser("guild_education")});
		setTimeout(() => setInterval(this.refreshData, 500), 5000);
	}

	refreshData() {
		this.setState({
			messages: this.notAServer.fetchMessagesForUser(this.state.currentUser)
	    });
	}

	render() {
		return (
			<div>
				<h1>Hello!</h1>
				<h3>{this.state.currentUser}</h3>
				<InitAsUser notAStore={this.store}/>
				<Conversations
					notAStore={this.store}
					messages={this.state.messages}
					currentUser={this.state.currentUser}
				/>
				<Messages
					notAStore={this.store}
					messages={this.state.messages}
					currentConversation={this.state.currentConversation}
				/>
				<Sender
					notAStore={this.store}
				/>
				<MemoryClear />
			</div>
		);
	}
}

export default RootApp;
