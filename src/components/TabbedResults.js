import React, {Component} from "react";
import {Tab, Tabs} from "material-ui/Tabs";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import moment from "moment";
import TabResultContainer from "../containers/TabResultContainer";

class TabbedResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBoxes: [],
            fromDate: null,
            fromHours: null,
            toDate: null,
            toHours: null
        };
    }

    componentDidUpdate() {
        if (
            this.state.selectedBoxes !== this.props.selectedBoxes ||
            moment(this.state.fromDate).format('YYYY-MM-DD') !== moment(this.props.fromDate).format('YYYY-MM-DD') ||
            moment(this.state.toDate).format('YYYY-MM-DD') !== moment(this.props.toDate).format('YYYY-MM-DD') ||
            this.state.fromHours !== moment(this.props.fromHours).format('HH:mm:ss') ||
            this.state.toHours !== moment(this.props.toHours).format('HH:mm:ss')
        ) {
            const fromDate = moment(this.props.fromDate).format('YYYY-MM-DD');
            const toDate = moment(this.props.toDate).format('YYYY-MM-DD');
            const fromHours = moment(this.props.fromHours).format('HH:mm:ss');
            const toHours = moment(this.props.toHours).format('HH:mm:ss');
            this.setState({selectedBoxes: this.props.selectedBoxes});
            this.setState({fromDate});
            this.setState({toDate});
            this.setState({fromHours});
            this.setState({toHours});
        }
    }

    render() {
        const hostname = "localhost:8080";
        return (
            <Tabs>
                {
                    this.state.selectedBoxes.map(
                        (box) => {
                            const {fromDate, fromHours, toDate, toHours} = this.state;
                            let url =
                                `http://${hostname}/get_all_obs_from_date_to_date_for_obs_sys?obsys=${box.boxName.toUpperCase()}&datafrom=${fromDate}&h_from=${fromHours}&datato=${toDate}&h_to=${toHours}`;
                            return (
                                <Tab key={String(box.boxName)} label={box.boxName}>
                                    <TabResultContainer
                                        key={String(box.boxName)} label={box.boxName} url={url} boxName={box.boxName} csv={box.csv}
                                        fromDate={this.state.fromDate}
                                        toDate={this.state.toDate}
                                        fromHours={this.state.fromHours}
                                        toHours={this.state.toHours}
                                    />
                                </Tab>
                            );
                        }
                    )
                }
            </Tabs>
        );
    }
}

export default TabbedResults;