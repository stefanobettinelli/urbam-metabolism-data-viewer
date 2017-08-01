import {connect} from 'react-redux';
import TabbedResults from '../components/TabbedResults';

const mapStateToProps = (state) => {
    return {
        selectedBoxes: state.selectedBoxes,
        fromDate: state.form.MaterialUiForm.values !== undefined ? state.form.MaterialUiForm.values.fromDate : null,
        toDate: state.form.MaterialUiForm.values !== undefined ? state.form.MaterialUiForm.values.toDate : null,
        fromHours: state.form.MaterialUiForm.values !== undefined ? state.form.MaterialUiForm.values.fromHours : null,
        toHours: state.form.MaterialUiForm.values !== undefined ? state.form.MaterialUiForm.values.toHours : null
    }
};

const TabbedResultsContainer = connect(mapStateToProps)(TabbedResults);

export default TabbedResultsContainer;