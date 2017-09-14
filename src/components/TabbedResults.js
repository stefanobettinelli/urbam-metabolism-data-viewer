import React, {Component} from "react";
import {Tab, Tabs} from "material-ui/Tabs";
import moment from "moment";
import TabResultContainer from "../containers/TabResultContainer";
import {D_FORMAT, T_FORMAT} from "../commons/Constants";
import {REST_API_HOSTNAME} from "../commons/Constants";
import {CircularProgress} from "material-ui";
import {white} from 'material-ui/styles/colors';

class TabbedResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBoxes: {items: []},
            fromDate: null,
            fromHours: null,
            toDate: null,
            toHours: null
        };
    }

    componentDidUpdate() {
        const fromHoursString = this.props.fromHours ? moment(this.props.fromHours).format(T_FORMAT) : null;
        const fromDateString = this.props.fromDate ? moment(this.props.fromDate).format(D_FORMAT) : null;
        const toHoursString = this.props.toHours ? moment(this.props.toHours).format(T_FORMAT) : null;
        const toDateString = this.props.toDate ? moment(this.props.toDate).format(D_FORMAT) : null;

        const propFromDateUTC = moment(`${fromDateString} ${fromHoursString}`).utc().format(D_FORMAT);
        const propToDateUTC = moment(`${toDateString} ${toHoursString}`).utc().format(D_FORMAT);
        const propFromHoursUTC = moment(`${fromDateString} ${fromHoursString}`).utc().format(T_FORMAT);
        const propToHoursUTC = moment(`${toDateString} ${toHoursString}`).utc().format(T_FORMAT);

        if (this.state.selectedBoxes !== this.props.selectedBoxes) {
            //debugger;
            this.setState({selectedBoxes: this.props.selectedBoxes});
        }

        // debugger;
        // if (this.state.selectedBoxes.items.map(box => box.boxName).sort().join() !== this.props.selectedBoxes.items.map(box => box.boxName).sort().join()) {
        //     this.setState({selectedBoxes: this.props.selectedBoxes});
        // }

        if (
            moment(this.state.fromDate).format(D_FORMAT) !== propFromDateUTC ||
            moment(this.state.toDate).format(D_FORMAT) !== propToDateUTC ||
            this.state.fromHours !== propFromHoursUTC ||
            this.state.toHours !== propToHoursUTC
        ) {
            const fromDate = propFromDateUTC;
            const toDate = propToDateUTC;
            const fromHours = propFromHoursUTC;
            const toHours = propToHoursUTC;
            this.setState({fromDate});
            this.setState({toDate});
            this.setState({fromHours});
            this.setState({toHours});
        }

        console.log(this.props.selectedBoxes.itemsToRender);
    }

    render() {
        if(!this.state.selectedBoxes.items) {
            return null;
        }
        return (
            <Tabs>
                {
                    this.state.selectedBoxes.items.map(
                        (box) => {
                            const {fromDate, fromHours, toDate, toHours} = this.state;
                            let url =
                                `http://${REST_API_HOSTNAME}/get_all_obs_from_date_to_date_for_obs_sys?obsys=${box.boxName.toUpperCase()}&datafrom=${fromDate}&h_from=${fromHours}&datato=${toDate}&h_to=${toHours}`;
                            return (
                                <Tab key={String(box.boxName)}  icon={box.isFetching ? <CircularProgress color={white}/> : null} label={box.boxName}>
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