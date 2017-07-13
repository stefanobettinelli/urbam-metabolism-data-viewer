import React, {Component} from "react";
import {Tab, Tabs} from "material-ui/Tabs";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

class TabbedResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedBoxes: [],
            fromDate: null,
            fromHours: null,
            toDate: null,
            toHours: null
        };
    }

    componentDidUpdate(){
        if (
            this.state.selectedBoxes !== this.props.selectedBoxes ||
            this.state.fromDate !== this.props.fromDate ||
            this.state.fromHours !== this.props.fromHours ||
            this.state.toDate !== this.props.toDate ||
            this.state.toHours !== this.props.toHours
        ) {
            this.setState({selectedBoxes: this.props.selectedBoxes});
            this.setState({fromDate: this.props.fromDate});
            this.setState({toDate: this.props.toDate});
            this.setState({fromHours: this.props.fromHours});
            this.setState({toHours: this.props.toHours});
            const hostname = window.location.href.includes('scll') || window.location.href.includes('10.105') ? 'urbanclimate-rest.app.scll' : '62.86.126.18:8080';
            console.log(this.state);
            //const URL = `http://${hostname}/get_all_obs_from_date_to_date_for_obs_sys?obsys=${boxNameSearched.toUpperCase()}&datafrom=${dateFrom}&h_from=${hFrom}&datato=${dateTo}&h_to=${hTo}`;
        }
    }

    render() {
        return (
            <Tabs>
                {
                    this.state.selectedBoxes.map(
                        (boxName) => (
                            <Tab key={String(boxName)} label={boxName}>
                                <div>
                                </div>
                            </Tab>
                        )
                    )
                }
            </Tabs>
        );
    }
}

export default TabbedResults;