import {connect} from 'react-redux';
import MultipleSelect from '../components/MultipleSelect';
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

const MultipleSelectContainer = connect(mapStateToProps, mapDispatchToProps)(MultipleSelect);

export default MultipleSelectContainer;