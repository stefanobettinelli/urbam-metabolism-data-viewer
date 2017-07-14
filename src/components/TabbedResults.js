import React, {Component} from "react";
import {Tab, Tabs} from "material-ui/Tabs";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import moment from 'moment';

class TabbedResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBoxes: [],
            fromDate: moment.now(),
            fromHours: moment().utc().format('hh:mm:ss'),
            toDate: moment.now(),
            toHours: moment().utc().format('hh:mm:ss')
        };
        console.log("constructor state: ", this.state);
        this.fetchBoxesData = this.fetchBoxesData.bind(this);
    }

    componentDidUpdate() {
        if (
            this.state.selectedBoxes !== this.props.selectedBoxes ||
            moment(this.state.fromDate).format('YYYY-MM-DD') !== moment(this.props.fromDate).format('YYYY-MM-DD') ||
            moment(this.state.toDate).format('YYYY-MM-DD') !== moment(this.props.toDate).format('YYYY-MM-DD') ||
            this.state.fromHours !== moment(this.props.fromHours).format('hh:mm:ss') ||
             this.state.toHours !== moment(this.props.toHours).format('hh:mm:ss')
        ) {
            const fromDate = moment(this.props.fromDate).format('YYYY-MM-DD');
            const toDate = moment(this.props.toDate).format('YYYY-MM-DD');
            const fromHours = moment(this.props.fromHours).format('hh:mm:ss');
            const toHours = moment(this.props.toHours).format('hh:mm:ss');
            this.setState({selectedBoxes: this.props.selectedBoxes});
            this.setState({fromDate});
            this.setState({toDate});
            this.setState({fromHours});
            this.setState({toHours});
            //this.fetchBoxesData(this.fetchBoxesData({...this.props}));
        }
    }

    fetchBoxesData({selectedBoxes, fromDate = '2017-06-01', toDate = '2017-06-12', fromHours, toHours}) {
        const hostname = window.location.href.includes('scll') || window.location.href.includes('10.105') ? 'urbanclimate-rest.app.scll' : '62.86.126.18:8080';
        selectedBoxes.forEach((boxName) => {
            let url = `http://${hostname}/get_all_obs_from_date_to_date_for_obs_sys?obsys=${boxName.toUpperCase()}&datafrom=${fromDate}&h_from=${fromHours}&datato=${toDate}&h_to=${toHours}`;
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then((response) => (console.log(response)));
            // .then(json => dispatch(fetchBoxListSuccess(json)))
            // .catch(() => console.log("Error while fetching selected box data"));
        });
    }

    render() {
        console.log("Render log current state", this.state);
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