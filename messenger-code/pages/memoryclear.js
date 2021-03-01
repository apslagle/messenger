let React = require('React');
import notAServer from '../public/notAServer';

class MemoryClear extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.notAServer = new notAServer();
    }

    handleSubmit(event) {
        this.notAServer.clearMyDB();
        event.preventDefault();
        this.notAServer.initNotAServer();
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="!!!Clear All Messages!!!" />
            </form>
        );
    }
}

export default MemoryClear;
