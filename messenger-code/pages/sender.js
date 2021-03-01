let React = require('React');
import notAServer from "../public/notAServer";

class Sender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleInit = this.handleInit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.notAStore = props.notAStore;
    }

    componentDidMount() {
        this.notAServer = new notAServer();
    }

    handleInit(event) {
        this.notAServer.addMessage({
            sender: this.notAStore.getCurrentUser(),
            recipient: this.notAStore.getCurrentConversation(),
            timestamp: Date.now(),
            message: this.state.value
        });
        this.setState({value: ''});
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleInit}>
                <label>
                    <div>Your Message:</div>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Send" />
            </form>
        );
    }
}

export default Sender;
