import React from "react";
import {Tab, Tabs} from "material-ui/Tabs";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";

// const styles = {
//     headline: {
//         fontSize: 24,
//         paddingTop: 16,
//         marginBottom: 12,
//         fontWeight: 400,
//     },
// };

// function handleActive(tab) {
//     alert(`A tab with this route property ${tab.props['data-route']} was activated.`);
// }

const TabbedResults = () => (
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

export default TabbedResults;