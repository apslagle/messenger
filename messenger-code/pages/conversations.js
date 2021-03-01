let React = require('React');

class Conversations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentConversation: '', value: '', select: '', messages: props.messages || [], conversations: []};

        this.handleInit = this.handleInit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.refreshConversations = this.refreshConversations.bind(this);

        this.notAStore = props.notAStore;
        this.currentUser = props.currentUser;
    }

    componentDidMount() {
        this.notAStore.setCurrentConversation('andrew_s');
        this.setState({messages: this.notAStore.getMessages(this.notAStore.getCurrentUser())});
        setInterval(this.refreshConversations, 500);
    }

    refreshConversations() {
        this.setState({messages: this.notAStore.getMessages(this.notAStore.getCurrentUser()),
                       conversations: this.state.messages.reduce((a, b) => {
            if (!a.includes(b.sender)) {
                a.push(b.sender);
            }
            if (!a.includes(b.recipient)) {
                a.push(b.recipient);
            }
            return a;
        }, []).map(user => <option value={user}>{user}</option>)});
    }

    handleInit(event) {
        event.preventDefault();
        this.setState({currentConversation: this.state.value});
        this.notAStore.setCurrentConversation(this.state.value);
        this.notAServer.addMessage({
            sender: this.notAStore.getCurrentUser(),
            recipient: this.state.value,
            timestamep: Date.now(),
            message: ""
        });
    }

    handleSelect(event) {
        this.notAStore.setCurrentConversation(event.target.value);
        this.setState({currentConversation: event.target.value,
                       select: event.target.value});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Pick who you want to talk to:
                        <select value={this.state.currentConversation} onChange={this.handleSelect}>
                            {this.state.conversations}
                        </select>
                          Or
                    </label>
                </form>
                <form onSubmit={this.handleInit}>
                    <label>
                        Start A Conversation with:
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Conversations;
