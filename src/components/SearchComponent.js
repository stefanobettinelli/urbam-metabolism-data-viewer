import React, {Component} from "react";
import DateTime from "react-datetime";
import {ControlLabel, Button, FormGroup, FormControl} from "react-bootstrap";

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

export default SearchComponent;