import React, {Component} from "react";
import {Tab, Tabs} from "material-ui/Tabs";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

class TabbedResults extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedBoxes: props.selectedBoxes,
            fromDate: null,
            fromHours: null,
            toDate: null,
            toHours: null
        };
    }

    componentDidUpdate(){
        console.log("componentDidUpdate", this.props);
    }

    render() {
        return (
            <Tabs>
                <Tab label="Item One">
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                    <TableHeaderColumn>Status</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableRowColumn>1</TableRowColumn>
                                    <TableRowColumn>John Smith</TableRowColumn>
                                    <TableRowColumn>Employed</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>2</TableRowColumn>
                                    <TableRowColumn>Randal White</TableRowColumn>
                                    <TableRowColumn>Unemployed</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>3</TableRowColumn>
                                    <TableRowColumn>Stephanie Sanders</TableRowColumn>
                                    <TableRowColumn>Employed</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>4</TableRowColumn>
                                    <TableRowColumn>Steve Brown</TableRowColumn>
                                    <TableRowColumn>Employed</TableRowColumn>
                                </TableRow>
                                <TableRow>
                                    <TableRowColumn>5</TableRowColumn>
                                    <TableRowColumn>Christopher Nolan</TableRowColumn>
                                    <TableRowColumn>Unemployed</TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </Tab>
                <Tab label="Item Two">

                </Tab>
                <Tab
                    label="onActive"
                >
                </Tab>
            </Tabs>
        );
    }
}

export default TabbedResults;