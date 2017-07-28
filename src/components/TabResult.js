import React, {Component} from "react";
import ReactTable from 'react-table';
import {
    getHeaderAsJSONFromCSVText,
    convertCSVBlobTextToListOfJSON,
    convertArrayOfObjectsToCSV
} from '../commons/Helpers';
import RaisedButton from "material-ui/RaisedButton";
import moment from "moment";

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
        const {fromDate, toDate, fromHours, toHours} = this.props;
        if (!moment(`${fromDate} ${fromHours}`, "YYYY-MM-DD HH:mm:ss", true).isValid() || !moment(`${toDate} ${toHours}`, "YYYY-MM-DD HH:mm:ss", true).isValid()) {
            //console.log(moment(`${fromDate} ${fromHours}`, "YYYY-MM-DD HH:mm:ss", true).isValid(), moment(`${toDate} ${toHours}`, "YYYY-MM-DD HH:mm:ss", true).isValid());
            return;
        }

        const {url, boxName} = this.props;
        this.setState({url});
        this.props.fetchCSVData(url, boxName);
    }

    componentDidUpdate() {
        if (this.props.url !== this.state.url) {
            this.fetchData();
        }
    }

    handleClick() {
        const {csv, boxName, fromDateLocal, toDateLocal, fromHoursLocal, toHoursLocal} = this.props;
        if (!csv) return;

        let data, filename, link;
        let csvText = convertArrayOfObjectsToCSV(csv.split('<br/>').slice(1));

        filename = `exportBox_${boxName}_from_${fromDateLocal}_at_${fromHoursLocal}_to_${toDateLocal}_at_${toHoursLocal}.csv`;

        if (!csvText.match(/^data:text\/csv/i)) {
            csvText = 'data:text/csv;charset=utf-8,' + csvText;
        }
        data = encodeURI(csvText);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
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