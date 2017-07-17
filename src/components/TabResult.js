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
        console.log("Tab component props: ", this.props);
        const {boxName} = this.props;
        return (
            <div key={String(boxName)} label={boxName}>
                {boxName}
            </div>
        );
    }

}

export default TabResult;