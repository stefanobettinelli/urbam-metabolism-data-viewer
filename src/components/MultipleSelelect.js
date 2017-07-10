import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

let names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

/**
 * `SelectField` can handle multiple selections. It is enabled with the `multiple` property.
 */
export default class MultipleSelect extends Component {
    state = {
        values: [],
        selecteds: []
    };

    componentDidMount() {
        const url = 'http://localhost:8080/obssys/search/findByNameStartsWith?name=SSB_';
        this.props.fetchData(url);
    }

    componentDidUpdate(prevProps) {
        if (this.props.fetchedBoxList !== this.state.values) {
            this.setState({values: this.props.fetchedBoxList});
        }
    }

    handleChange = (event, index, selecteds) => this.setState({selecteds});

    menuItems(values, selecteds) {
        //values.forEach((item) => console.log(item.name));
        return values.map((box) => (
            <MenuItem
                key={String(box.name)}
                insetChildren={true}
                checked={selecteds && selecteds.indexOf(box.name) > -1}
                value={box.name}
                primaryText={box.name}
            />
        ));
    }

    render() {
        const {values, selecteds} = this.state;
        return (
            <SelectField
                multiple={true}
                hintText="Select a name"
                value={selecteds}
                onChange={this.handleChange}
            >
                {this.menuItems(values, selecteds)}
            </SelectField>
        );
    }
}