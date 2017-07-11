import React from 'react';
import {Field, reduxForm} from 'redux-form';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import BoxListSelector from '../containers/BoxListSelector';

const renderDatePickerField = props => (
    <DatePicker
        autoOk={true}
        hintText={props.hintText}
    />
);

const renderTimePicker = props => (
    <TimePicker
        autoOk={true}
        format="24hr"
        hintText={props.hintText}
    />
);

const renderBoxList = props => (
    <BoxListSelector/>
);

const MaterialUiForm = props => {
    const {handleSubmit, pristine, reset, submitting} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="boxList" component={renderBoxList}/>
            </div>
            <div>
                <Field name="dateFrom" hintText="From Date" component={renderDatePickerField}/>
            </div>
            <div>
                <Field name="fromHours" hintText="From Hours" component={renderTimePicker}/>
            </div>
            <div>
                <Field name="toDate" hintText="To Date" component={renderDatePickerField}/>
            </div>
            <div>
                <Field name="toHours" hintText="To Hours" component={renderTimePicker}/>
            </div>
            <div>
                <RaisedButton label="Submit" primary={true} type="submit" style={{margin:12}}/>
                <RaisedButton label="Clear values" type="button" style={{margin:12}}/>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'MaterialUiForm',  // a unique identifier for this form
})(MaterialUiForm)