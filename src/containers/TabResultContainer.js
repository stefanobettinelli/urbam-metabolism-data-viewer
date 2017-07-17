import {connect} from 'react-redux';
import TabResult from '../components/TabResult';
import {fetchFilteredObservation} from '../actions';

const mapStateToPros = (state) => {
    return {
        fetchFilteredObservation: state.fetchFilteredObservation,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCSVData: (url, boxName) => dispatch(fetchFilteredObservation(url, boxName))
    };
};

const TabResultContainer = connect(mapStateToPros, mapDispatchToProps)(TabResult);

export default TabResultContainer;

