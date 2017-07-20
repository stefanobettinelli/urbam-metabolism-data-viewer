import React, {Component} from "react";

class TabResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {url} = this.props;
        this.setState({url});
        this.props.fetchCSVData(url, this.props.boxName);
    }

    componentDidUpdate() {
        if (this.props.url !== this.state.url) {
            this.fetchData();
        }
    }

    render() {
        const {boxName, csv} = this.props;
        return (
            <div key={String(boxName)} label={boxName}>
                <h1> {boxName} </h1> <br/>
                {/*{csv}*/}
            </div>
        );
    }

}

export default TabResult;