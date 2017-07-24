import React, {Component} from "react";
import ReactTable from 'react-table';
import {getHeaderAsJSONFromCSVText, convertCSVBlobTextToListOfJSON} from '../commons/Helpers';

import 'react-table/react-table.css';

class TabResult extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const {url} = this.props;
        this.setState({url});
        this.props.fetchCSVData(url, this.props.boxName);
    }

    componentDidUpdate() {
        if (this.props.url !== this.state.url) {
            this.fetchData();
        }
    }

    render() {
        const {csv} = this.props;

        const header = getHeaderAsJSONFromCSVText(csv);
        const csvData = convertCSVBlobTextToListOfJSON(csv);
        // console.log("CSV header ", header);
        console.log("CSV content ", csvData);

        const data = [
            {
                name: 'Tanner Linsley',
                age: 26,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                }
            },
            {
                name: 'Tanner Linsley',
                age: 26,
                friend: {
                    name: 'Jason Maurer',
                    age: 23,
                }
            }
        ];

        // const columns = [{
        //     Header: 'Name',
        //     accessor: 'name' // String-based value accessors!
        // }, {
        //     Header: 'Age',
        //     accessor: 'age',
        //     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        // }, {
        //     id: 'friendName', // Required because our accessor is not a string
        //     Header: 'Friend Name',
        //     accessor: d => d.friend.name // Custom value accessors!
        // }, {
        //     Header: props => <span>Friend Age</span>, // Custom header components!
        //     accessor: 'friend.age'
        // }];

        const columns = header ? [...header] : [];

        return (
            <ReactTable
                data={csvData}
                columns={columns}
            />
        );
    }

}

export default TabResult;