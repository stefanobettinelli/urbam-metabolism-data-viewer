import React, {Component} from "react";
import {Table, ControlLabel, Button, FormGroup, FormControl} from "react-bootstrap";
import DateTime from "react-datetime";
import {convertArrayOfObjectsToCSV} from './Helpers';
import './react-datetime.css';

// const DEFAULT_QUERY = 'redux';
// const PATH_BASE = 'https://10.105.0.1:8080';
// const PATH_SEARCH = '/get_all_obs_from_date_to_date_for_obs_sys';
// const PARAM_SEARCH = 'obsys=SSB_002&datafrom=2017-06-01&h_from=12:30&datato=2017-06-09&h_to=23:15';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            boxNameSearched: '',
            dateFrom: '',
            hFrom: '',
            dateTo: '',
            hTo: '',
        };

        this.onGetDataRequest = this.onGetDataRequest.bind(this);
    }

    onGetDataRequest(newSearchParams) {
        this.setState({
            boxNameSearched: newSearchParams.searchText,
            dateFrom: newSearchParams.dateFrom,
            hFrom: newSearchParams.hFrom,
            dateTo: newSearchParams.dateTo,
            hTo: newSearchParams.hTo,
        });
    }

    render() {
        const { boxNameSearched, dateFrom, hFrom, dateTo, hTo} = this.state;
        //const URL = `http://10.105.0.1:8080/get_all_obs_from_date_to_date_for_obs_sys?obsys=${boxNameSearched}&datafrom=${dateFrom}&h_from=${hFrom}&datato=${dateTo}&h_to=${hTo}`;
        //const URL = `http://10.105.0.1:8080/get_all_obs_from_date_to_date_for_obs_sys?obsys=${boxNameSearched.toUpperCase()}&datafrom=${dateFrom}&datato=${dateTo}`;
        //const URL = `http://localhost:8080/get_all_obs_from_date_to_date_for_obs_sys?obsys=${boxNameSearched.toUpperCase()}&datafrom=${dateFrom}&datato=${dateTo}`;
        const URL = `http://urbanclimate-rest.app.scll/get_all_obs_from_date_to_date_for_obs_sys?obsys=${boxNameSearched.toUpperCase()}&datafrom=${dateFrom}&h_from=${hFrom}&datato=${dateTo}&h_to=${hTo}`;
        console.log(hFrom);
        console.log(hTo);
        return (
            <div>
                <SearchComponent callBackParent={(newSearchParams) => this.onGetDataRequest(newSearchParams)}/>
                <BoxTableData url={URL} boxName={this.state.boxNameSearched}/>
            </div>
        );
    }
}

class SearchComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            dateFrom: '',
            hFrom: '',
            dateTo: '',
            hTo: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClickGetData = this.handleClickGetData.bind(this);
        this.handleDateFromChange = this.handleDateFromChange.bind(this);
        this.handleDateToChange = this.handleDateToChange.bind(this);
    }

    handleChange(e) {
        this.setState({searchText: e.target.value});
    }

    handleClickGetData() {
        this.setState({isLoading: true});

        this.props.callBackParent(this.state);

        setTimeout(() => {
            // Completed of async action, set loading state back
            this.setState({isLoading: false});
        }, 1000);
    }

    handleDateFromChange(e) {
        const momentObject = e.format('YYYY-MM-DD,HH:MM:SS').split(',');
        this.setState({
            dateFrom: momentObject[0],
            hFrom: momentObject[1],
        });
    }

    handleDateToChange(e) {
        const momentObject = e.format('YYYY-MM-DD,HH:MM:SS').split(',');
        this.setState({
            dateTo: momentObject[0],
            hTo: momentObject[1],
        });
    }

    render() {
        return (
            <div>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                    >
                        <FormControl
                            type="text"
                            value={this.state.searchText}
                            placeholder="Box Name"
                            onChange={this.handleChange}
                        />
                        <ControlLabel>Date From</ControlLabel>
                        <DateTime input={false} onChange={this.handleDateFromChange}/>
                        <ControlLabel>Date To</ControlLabel>
                        <DateTime input={false} onChange={this.handleDateToChange}/>
                        <Button bsStyle="primary"
                                onClick={!this.state.isLoading ? this.handleClickGetData : null}
                                disabled={this.state.isLoading}
                        >
                            Get Data
                        </Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
}

class BoxTableData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            boxNameSearched: 'SSB_002',
            obsList: [],
        };

        this.fetchSearchBoxObservations = this.fetchSearchBoxObservations.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let data, filename, link;
        let csv = convertArrayOfObjectsToCSV(this.state.obsList);
        if (csv === null) return;

        filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }

    componentWillReceiveProps(nextProps) {
        // console.log("nextPros ", nextProps);
        // if (nextProps.boxName && this.state.boxNameSearched.toUpperCase() !== nextProps.boxName.toUpperCase()) {
        //     this.setState({boxNameSearched: nextProps.boxName.toUpperCase()});
        // }
        this.setState({ url: nextProps.url });
    }


    fetchSearchBoxObservations() {
        //console.log("new fetch ", this.state.url);
        fetch(this.state.url).then(response => response.text()).then(result => this.setState({obsList: result.split('<br/>').slice(1)}));
    }

    render() {
        return (
            <div>
                <Button
                    id="downloadCSVButton"
                    href="#"
                    bsStyle="primary"
                    onClick={this.handleClick}
                >
                    Download CSV
                </Button>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>box name</th>
                        <th>timestamp</th>
                        <th>co</th>
                        <th>co2</th>
                        <th>no2</th>
                        <th>o3</th>
                        <th>pm2.5</th>
                        <th>pm10</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.obsList.map(
                            (item, index) => <TableRow key={item.split(',')[1]} rowData={item.split(',')}
                                                       rowIndex={index}/>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        );
    }

    componentDidMount() {
        this.fetchSearchBoxObservations();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.boxNameSearched && prevState.url !== this.state.url) {
            this.fetchSearchBoxObservations();
        }
    }

}

const TableRow = ({rowData, rowIndex}) => {
    return (
        <tr>
            <td>{rowIndex}</td>
            <td>{rowData[0]}</td>
            <td>{rowData[1]}</td>
            <td>{rowData[2]}</td>
            <td>{rowData[3]}</td>
            <td>{rowData[4]}</td>
            <td>{rowData[5]}</td>
            <td>{rowData[6]}</td>
            <td>{rowData[7]}</td>
        </tr>
    )
};

export default App;
