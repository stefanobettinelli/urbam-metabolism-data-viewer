/*
    Container component for the TabResult component
 */

import {connect} from 'react-redux';
import TabResult from '../components/TabResult';
import {fetchFilteredObservation} from '../actions';

/*
    mapping the dispatch function to props so that the TabResult component
    can use it to dispatch the fetchFilteredObservation action to the store
*/
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCSVData: (url, boxName) => dispatch(fetchFilteredObservation(url, boxName))
    };
};

//we use connecto to connect the TabResult to the Redux Store
const TabResultContainer = connect(null, mapDispatchToProps)(TabResult);

export default TabResultContainer;

