let React = require('React');

class InitAsUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleInit = this.handleInit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.notAStore = props.notAStore;
    }

    handleInit(event) {
        this.notAStore.setCurrentUser(this.state.value);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <form onSubmit={this.handleInit}>
                <label>
                    Your Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default InitAsUser;
