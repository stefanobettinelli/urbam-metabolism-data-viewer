import {connect} from 'react-redux';
import TabbedResults from '../components/TabbedResults';

const mapStateToProps = (state) => {
    return {
        selectedBoxes: state.selectedBoxes
    }
};

const TabbedResultsContainer = connect(mapStateToProps)(TabbedResults);

export default TabbedResultsContainer;