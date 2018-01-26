import React, {Component} from "react";
import ReactTable from 'react-table';
import {
    getHeaderAsJSONFromCSVText,
    convertCSVBlobTextToListOfJSON,
    convertArrayOfObjectsToCSV
} from '../commons/Helpers';
import RaisedButton from "material-ui/RaisedButton";
import moment from "moment";
import {D_FORMAT, T_FORMAT} from "../commons/Constants";
import FileSaver from "file-saver";

import 'react-table/react-table.css';

class TabResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };

        this.fetchData = this.fetchData.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {fromDate, toDate, fromHours, toHours, fetchNewDataFor, url, boxName} = this.props;
        if (fetchNewDataFor === boxName || fetchNewDataFor === "ALL") {
            if (!moment(`${fromDate} ${fromHours}`, `${D_FORMAT} ${T_FORMAT}`, true).isValid() || !moment(`${toDate} ${toHours}`, `${D_FORMAT} ${T_FORMAT}`, true).isValid()) {
                return;
            }

            this.setState({url});
            this.props.fetchCSVData(url, boxName);
        }
    }

    componentDidUpdate() {
        if (this.props.url !== this.state.url) {
            this.fetchData();
        }
    }


    /*
        handle download cvs button click
        FileSaver.js is used to be able to save large blob file on the client side
     */
    handleClick() {
        const {csv, boxName, fromDateLocal, toDateLocal, fromHoursLocal, toHoursLocal} = this.props;
        if (!csv) return;

        let data, filename, link;
        let csvText = convertArrayOfObjectsToCSV(csv.split('<br/>').slice(1));

        filename = `exportBox_${boxName}_from_${fromDateLocal}_at_${fromHoursLocal}_to_${toDateLocal}_at_${toHoursLocal}.csv`;

        data = csvText;
        let blob = new Blob([data], {type: "text/csv;charset=utf-8"});
        FileSaver.saveAs(blob, filename);
    }

    render() {
        const {csv} = this.props;

        const header = getHeaderAsJSONFromCSVText(csv);
        const csvData = convertCSVBlobTextToListOfJSON(csv);

        const columns = header ? [...header] : [];

        return (
            <div>
                <RaisedButton disabled={!csvData || csvData.length < 1} onTouchTap={this.handleClick}
                              label="Download CSV" primary={true} type="submit" style={{margin: 12}}/>
                <ReactTable
                    data={csvData}
                    columns={columns}
                />
            </div>
        );
    }

}

export default TabResult;