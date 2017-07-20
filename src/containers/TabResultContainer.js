import {connect} from 'react-redux';
import TabResult from '../components/TabResult';
import {fetchFilteredObservation} from '../actions';

// const mapStateToPros = (state) => {
//     return {
//         selectedBoxes: state.selectedBoxes,
//         fetchFilteredObservation: state.fetchFilteredObservation,
//     }
// };

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCSVData: (url, boxName) => dispatch(fetchFilteredObservation(url, boxName))
    };
};

const TabResultContainer = connect(null, mapDispatchToProps)(TabResult);

export default TabResultContainer;

