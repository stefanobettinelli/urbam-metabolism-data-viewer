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

    componentDidUpdate(prevProps, prevState){
        console.log("tabs props: ",this.props);
        if (this.state.selectedBoxes !== this.props.selectedBoxes) {
            this.setState({selectedBoxes: this.props.selectedBoxes});
        }
    }

    render() {
        return (
            <Tabs>
                {
                    this.state.selectedBoxes.map(
                        (boxName) => (
                            <Tab key={String(boxName)} label={boxName}>
                                <div>
                                </div>
                            </Tab>
                        )
                    )
                }
            </Tabs>
        );
    }
}

export default TabbedResults;