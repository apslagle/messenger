let React = require('React');
import styles from '../styles/Display.module.css';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages: props.messages || [], currentConversation: props.currentConversation || ''};

        this.refreshMessages = this.refreshMessages.bind(this);
        this.notAStore = props.notAStore;
    }

    componentDidMount() {
        setInterval(this.refreshMessages, 500)
    }

    refreshMessages() {
        this.setState({
            messages: this.notAStore.getMessages().sort((a, b) => {
                a.timestamp - b.timestamp
            }).filter(a => {
                return a.message !== '' && (a.sender === this.state.currentConversation || a.recipient === this.state.currentConversation)
            }).map((message, i) => {
                let className = message.recipient === this.state.currentConversation ? "user" : "convo";
                return (
                    <div className={styles[className]}>
                        <h5>
                            {message.sender}
                        </h5>
                        <p>
                            {message.message}
                        </p>
                    </div>
                    )
                }),
            currentConversation: this.notAStore.getCurrentConversation()
        });
    }

    render() {
        return (
            <div>
                <h4>You are talking to</h4>
                <h3>{this.state.currentConversation}</h3>
                <div width="500px">
                    {this.state.messages}
                </div>
            </div>
        );
    }
}

export default Messages;
