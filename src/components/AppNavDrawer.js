import React from "react";
import Drawer from "material-ui/Drawer";
import MeterialUIForm from "./MaterialUIForm";

export default class AppNavDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            boxList: []
        };

        this.fetchBoxListNames = this.fetchBoxListNames.bind(this);
        this.setBoxListNames = this.setBoxListNames.bind(this);
    }

    fetchBoxListNames() {
        fetch('http://localhost:8080/obssys/search/findByNameStartsWith?name=SSB_')
            .then(response => response.json())
            .then(result => this.setBoxListNames(result))
            .catch((error) => {
                console.log("there's been a problem: ", error.message);
            });
    }

    setBoxListNames(result) {
        let localBoxList = result._embedded.obssys.map((item) => item.name);
        this.setState({boxList: localBoxList});
    }

    componentDidMount() {
        this.fetchBoxListNames();
    }

    render() {
        return (
            <div>
                <Drawer docked={true} open={true}>
                    <MeterialUIForm />
                </Drawer>
            </div>
        );
    }
}