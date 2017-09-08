import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {REST_API_HOSTNAME} from "../commons/Constants"

export default class MultipleSelect extends Component {
    state = {
        values: []
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.menuItems = this.menuItems.bind(this);
    }

    componentDidMount() {
        const url = `http://${REST_API_HOSTNAME}/obssys/search/findByNameStartsWith?name=SSB_`;
        this.props.fetchData(url);
    }

    componentDidUpdate() {
        if (this.props.fetchedBoxList !== this.state.values) {
            this.setState({values: this.props.fetchedBoxList});
        }
    }

    handleChange (event, index, selected) {
        const {updatedSelectedBoxes} = this.props;
        updatedSelectedBoxes(selected);
        this.setState({selected});
    }

    menuItems(values, selected) {
        const boxNameList = values.map(obj => obj.name);
        boxNameList.sort();
        return boxNameList.map((boxName) => (
            <MenuItem
                key={String(boxName)}
                insetChildren={true}
                checked={selected && selected.indexOf(boxName) > -1}
                value={boxName}
                primaryText={boxName}
            />
        ));
    }

    render() {
        const {values} = this.state;
        let selected = this.props.selectedBoxes.items.map(boxObj => boxObj.boxName );
        return (
            <SelectField
                multiple={true}
                hintText="Select a Sensor Box"
                value={selected}
                onChange={this.handleChange}
            >
                { this.menuItems(values, selected) }
            </SelectField>
        );
    }
}