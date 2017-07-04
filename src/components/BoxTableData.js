import React, {Component} from "react";
import {Table, Button} from "react-bootstrap";
import {convertArrayOfObjectsToCSV} from '../commons/Helpers';

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
        this.setState({url: nextProps.url});
    }


    fetchSearchBoxObservations() {
        fetch(this.state.url).then(response => response.text()).then(result => this.setState({obsList: result.split('<br/>').slice(1)}));
    }

    render() {
        console.log(this.state.obsList);
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
                            (item, index) => {
                                if (item) {
                                    return (
                                        <TableRow
                                            rowData={item.split(';')}
                                            rowIndex={index}
                                        />
                                    );
                                }
                            }
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

export default BoxTableData;