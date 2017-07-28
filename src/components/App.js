import React, {Component} from "react";
import AppNavDrawer from "./AppNavDrawer";
import TabbedResultsContainer from '../containers/TabbedResultsContainer';

class App extends Component {
    render() {
        return (
            <div style={{paddingLeft: '256px'}}>
                <AppNavDrawer/>
                <TabbedResultsContainer/>
            </div>
        );
    }
}

export default App;
