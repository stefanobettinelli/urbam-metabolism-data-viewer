import React from "react";
import Drawer from "material-ui/Drawer";
import AutoComplete from "material-ui/AutoComplete";
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

// const DEFAULT_QUERY = `http://localhost:8080/obssys/search/`;
// const PARAM_SEARCH = `findByNameStartsWith?name=SSB_`;

//let boxList = [];

export default class AppNavDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            boxList: []
        };

        this.fetchBoxListNames = this.fetchBoxListNames.bind(this);
        this.setBoxListNames = this.setBoxListNames.bind(this);
    }

    fetchBoxListNames() {
        // const myHeaders = new Headers();
        // const myInit = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     mode: 'cors',
        //     cache: 'default'
        // };
        fetch('http://localhost:8080/obssys/search/findByNameStartsWith?name=SSB_')
            .then(response => response.json())
            .then(result => this.setBoxListNames(result))
            .catch((error) => {
                console.log("there's been a problem: ", error.message);
            });
    }

    setBoxListNames(result) {
        let localBoxList = result._embedded.obssys.map((item) => item.name);
        this.setState({boxList: localBoxList});
        console.log(localBoxList);
    }

    componentDidMount() {
        this.fetchBoxListNames();
    }

    render() {
        return (
            <div>
                <Drawer docked={true} open={true}>
                    <AutoComplete
                        floatingLabelText="type box name to search"
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={this.state.boxList}
                        maxSearchResults={5}
                    />
                    <DatePicker autoOk={true} hintText="From Date"/>
                    <TimePicker format="24hr" hintText="Hour from"/>
                    <DatePicker autoOk={true} hintText="To Date"/>
                    <TimePicker format="24hr" hintText="Hour To"/>
                </Drawer>
            </div>
        );
    }
}