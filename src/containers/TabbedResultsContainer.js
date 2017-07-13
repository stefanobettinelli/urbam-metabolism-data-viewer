import {connect} from 'react-redux';
import TabbedResults from '../components/TabbedResults';

const mapStateToProps = (state) => {
    return {
        selectedBoxes: state.selectedBoxes,
        fromDate: state.form.MaterialUiForm.values !== undefined ? state.form.MaterialUiForm.values.fromDate : null
    }
};

const TabbedResultsContainer = connect(mapStateToProps)(TabbedResults);

export default TabbedResultsContainer;