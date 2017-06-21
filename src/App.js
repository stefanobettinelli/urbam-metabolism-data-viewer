import React, {Component} from "react";
import SearchComponent from './components/SearchComponent'
import BoxTableData from './components/BoxTableData';
import './react-datetime.css';

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
        const {boxNameSearched, dateFrom, hFrom, dateTo, hTo} = this.state;
        const URL = `http://urbanclimate-rest.app.scll/get_all_obs_from_date_to_date_for_obs_sys?obsys=${boxNameSearched.toUpperCase()}&datafrom=${dateFrom}&h_from=${hFrom}&datato=${dateTo}&h_to=${hTo}`;
        return (
            <div>
                <SearchComponent callBackParent={(newSearchParams) => this.onGetDataRequest(newSearchParams)}/>
                <BoxTableData url={URL} boxName={this.state.boxNameSearched}/>
            </div>
        );
    }
}

export default App;
