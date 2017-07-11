import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {boxSelected} from '../actions';

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
export default class MultipleSelect extends Component {
    state = {
        values: [],
        selected: []
    };

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const url = 'http://localhost:8080/obssys/search/findByNameStartsWith?name=SSB_';
        this.props.fetchData(url);
    }

    componentDidUpdate() {
        if (this.props.fetchedBoxList !== this.state.values) {
            this.setState({values: this.props.fetchedBoxList});
        }
    }

    handleChange (event, index, selected) {
        const {updatedSelectedBoxes} = this.props;
        console.log(selected);
        updatedSelectedBoxes(selected);
        this.setState({selected});
    }

    menuItems(values, selected) {
        return values.map((box) => (
            <MenuItem
                key={String(box.name)}
                insetChildren={true}
                checked={selected && selected.indexOf(box.name) > -1}
                value={box.name}
                primaryText={box.name}
            />
        ));
    }

    render() {
        const {values, selected} = this.state;
        return (
            <SelectField
                multiple={true}
                hintText="Select a name"
                value={selected}
                onChange={this.handleChange}
            >
                {this.menuItems(values, selected)}
            </SelectField>
        );
    }
}