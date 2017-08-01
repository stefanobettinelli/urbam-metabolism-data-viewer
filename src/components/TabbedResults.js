import React, {Component} from "react";
import {Tab, Tabs} from "material-ui/Tabs";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import moment from "moment";
import TabResultContainer from "../containers/TabResultContainer";
import {D_FORMAT, T_FORMAT} from "../commons/Constants";

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
        const fromHoursString = moment(this.props.fromHours).format(T_FORMAT);
        const fromDateString = moment(this.props.fromDate).format(D_FORMAT);
        const toHoursString = moment(this.props.toHours).format(T_FORMAT);
        const toDateString = moment(this.props.toDate).format(D_FORMAT);

        const propFromDateUTC = moment(`${fromDateString} ${fromHoursString}`).utc().format(D_FORMAT);
        const propToDateUTC = moment(`${toDateString} ${toHoursString}`).utc().format(D_FORMAT);
        const propFromHoursUTC = moment(`${fromDateString} ${fromHoursString}`).utc().format(T_FORMAT);
        const propToHoursUTC = moment(`${toDateString} ${toHoursString}`).utc().format(T_FORMAT);

        // console.log("FULL TO UTC FROM DATE ==> ",moment(`${fromDateString} ${fromHoursString}`).utc().format(D_FORMAT));
        // console.log("FULL TO UTC FROM TIME ==> ",moment(`${fromDateString} ${fromHoursString}`).utc().format(T_FORMAT));
        // console.log("FULL TO UTC TO DATE ==> ",moment(`${toDateString} ${toHoursString}`).utc().format(D_FORMAT));
        // console.log("FULL TO UTC TO TIME ==> ",moment(`${toDateString} ${toHoursString}`).utc().format(T_FORMAT));

        if (
            this.state.selectedBoxes !== this.props.selectedBoxes ||
            moment(this.state.fromDate).format(D_FORMAT) !== propFromDateUTC ||
            moment(this.state.toDate).format(D_FORMAT) !== propToDateUTC ||
            this.state.fromHours !== propFromHoursUTC ||
            this.state.toHours !== propToHoursUTC
        ) {

            const fromDate = propFromDateUTC;
            const toDate = propToDateUTC;
            const fromHours = propFromHoursUTC;
            const toHours = propToHoursUTC;
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
                                        fromDateLocal={moment(this.props.fromDate).format(D_FORMAT)}
                                        toDateLocal={moment(this.props.toDate).format(D_FORMAT)}
                                        fromHoursLocal={moment(this.props.fromHours).format(T_FORMAT)}
                                        toHoursLocal={moment(this.props.toHours).format(T_FORMAT)}
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