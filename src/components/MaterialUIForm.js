import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { DatePicker, TimePicker } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import MultipleSelectContainer from '../containers/MultipleSelectContainer';
import store from '../store';
import { clearSelectedBoxList, timeZoneChanged } from '../actions';

const renderBoxList = props => {
  return <MultipleSelectContainer />;
};

const styles = {
  radioButton: {
    marginBottom: 16
  }
};

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="boxList" component={renderBoxList} />
      </div>
      <div>
        <Field
          name="fromDate"
          component={DatePicker}
          format={null}
          hintText="From Date?"
          // onChange={() => store.dispatch()}
        />
      </div>
      <div>
        <Field
          name="fromHours"
          autoOk={true}
          component={TimePicker}
          format={null}
          props={{ format: '24hr' }}
          hintText="From Hours?"
        />
      </div>
      <div>
        <Field
          name="toDate"
          component={DatePicker}
          format={null}
          hintText="To Date?"
        />
      </div>
      <div>
        <Field
          name="toHours"
          autoOk={true}
          component={TimePicker}
          format={null}
          props={{ format: '24hr' }}
          hintText="To Hours?"
        />
      </div>
      <div>
        <RadioButtonGroup onChange={(ev, val) => store.dispatch(timeZoneChanged(val.toUpperCase()))} name="shipSpeed" defaultSelected="utc">
          <RadioButton
            value="utc"
            label="UTC"
            style={styles.radioButton}
          />
          <RadioButton
            value="cet"
            label="CET"
            style={styles.radioButton}
          />
          <RadioButton
            value="cest"
            label="CEST"
            style={styles.radioButton}
          />
          <RadioButton
            value="eu-rome"
            label="EU-ROME"
            style={styles.radioButton}
          />
        </RadioButtonGroup>
        <RaisedButton
          onTouchTap={() => {
            reset();
            store.dispatch(clearSelectedBoxList());
          }}
          label="Clear values"
          type="button"
          style={{ margin: 12 }}
        />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'MaterialUiForm' // a unique identifier for this form
})(MaterialUiForm);
