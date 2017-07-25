import React from "react";
import {Field, reduxForm} from "redux-form";
import {DatePicker, TimePicker} from "redux-form-material-ui";
import RaisedButton from "material-ui/RaisedButton";
import MultipleSelectContainer from "../containers/MultipleSelectContainer";

const renderBoxList = (props) => {
    return (
        <MultipleSelectContainer/>
    );
};

const MaterialUiForm = props => {
    const {handleSubmit, pristine, reset, submitting} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field name="boxList" component={renderBoxList}/>
            </div>
            <div>
                <Field
                    name="fromDate"
                    component={DatePicker}
                    format={null}
                    hintText="From Date?"
                />
            </div>
            <div>
                <Field
                    name="fromHours"
                    autoOk={true}
                    component={TimePicker}
                    format={null}
                    props={{format: "24hr"}}
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
                    props={{format: "24hr"}}
                    hintText="To Hours?"
                />
            </div>
            <div>
                {/*<RaisedButton label="Submit" primary={true} type="submit" style={{margin: 12}}/>*/}
                <RaisedButton label="Clear values" type="button" style={{margin: 12}}/>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'MaterialUiForm',  // a unique identifier for this form
})(MaterialUiForm)