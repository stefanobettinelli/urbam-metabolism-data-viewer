import {connect} from 'react-redux';
import MultipleSelelect from '../components/MultipleSelelect';
import {fetchBoxList} from '../actions';

const mapStateToProps = (state) => {
    return {
        fetchedBoxList: state.fetchedBoxList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchBoxList(url))
    };
};

const BoxListSelector = connect(mapStateToProps, mapDispatchToProps)(MultipleSelelect);

export default BoxListSelector;