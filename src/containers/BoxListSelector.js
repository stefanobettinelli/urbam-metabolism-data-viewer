import {connect} from 'react-redux';
import MultipleSelelect from '../components/MultipleSelelect';
import {fetchBoxList, boxSelected} from '../actions';

const mapStateToProps = (state) => {
    return {
        fetchedBoxList: state.fetchedBoxList,
        selectedBoxes: state.selectedBoxes
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchBoxList(url)),
        updatedSelectedBoxes: (boxNameList) => dispatch(boxSelected(boxNameList))
    };
};

const BoxListSelector = connect(mapStateToProps, mapDispatchToProps)(MultipleSelelect);

export default BoxListSelector;