import React, {Component} from "react";
import SearchComponent from './components/SearchComponent'
import BoxTableData from './components/BoxTableData';
import './react-datetime.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hostname : '',
            isLoading: false,
            boxNameSearched: 'SSB_002',
            dateFrom: '',
            hFrom: '',
            dateTo: '',
            hTo: '',
        };

        this.onGetDataRequest = this.onGetDataRequest.bind(this);
    }

    onGetDataRequest(newSearchParams) {
        this.setState({
            hostname : window.location.href.includes('scll') || window.location.href.includes('10.105') ? 'urbanclimate-rest.app.scll' : '62.86.126.18:8080' ,
            boxNameSearched: newSearchParams.searchText,
            dateFrom: newSearchParams.dateFrom,
            hFrom: newSearchParams.hFrom,
            dateTo: newSearchParams.dateTo,
            hTo: newSearchParams.hTo,
        });
    }

    render() {
        const {hostname, boxNameSearched, dateFrom, hFrom, dateTo, hTo} = this.state;
        const URL = `http://${hostname}/get_all_obs_from_date_to_date_for_obs_sys?obsys=${boxNameSearched.toUpperCase()}&datafrom=${dateFrom}&h_from=${hFrom}&datato=${dateTo}&h_to=${hTo}`;

        return (
            <div>
                <SearchComponent callBackParent={(newSearchParams) => this.onGetDataRequest(newSearchParams)}/>
                <BoxTableData url={URL} boxName={this.state.boxNameSearched}/>
            </div>
        );
    }
}

export default App;
