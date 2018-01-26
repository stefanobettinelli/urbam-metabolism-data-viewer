import React, { Component } from 'react';
import { Tab, Tabs } from 'material-ui/Tabs';
import moment from 'moment';
import TabResultContainer from '../containers/TabResultContainer';
import { D_FORMAT, T_FORMAT } from '../commons/Constants';
import { REST_API_HOSTNAME } from '../commons/Constants';
import { CircularProgress } from 'material-ui';
import { white } from 'material-ui/styles/colors';

class TabbedResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedBoxes: { items: [] },
      fromDate: null,
      fromHours: null,
      toDate: null,
      toHours: null,
      timeZone: 'UTC',
      fetchNewDataFor: 'ALL' // this can be ALL, NONE or a precise boxname when a single box is added
    };
  }

  // componentDidUpdate
  componentWillReceiveProps(nextProps) {
    const fromHoursString = nextProps.fromHours
      ? moment(nextProps.fromHours).format(T_FORMAT)
      : null;
    const fromDateString = nextProps.fromDate
      ? moment(nextProps.fromDate).format(D_FORMAT)
      : null;
    const toHoursString = nextProps.toHours
      ? moment(nextProps.toHours).format(T_FORMAT)
      : null;
    const toDateString = nextProps.toDate
      ? moment(nextProps.toDate).format(D_FORMAT)
      : null;

    const propFromDateUTC = moment(`${fromDateString} ${fromHoursString}`)
      .utc()
      .format(D_FORMAT);

    const propToDateUTC = moment(`${toDateString} ${toHoursString}`)
      .utc()
      .format(D_FORMAT);
    const propFromHoursUTC = moment(`${fromDateString} ${fromHoursString}`)
      .utc()
      .format(T_FORMAT);
    const propToHoursUTC = moment(`${toDateString} ${toHoursString}`)
      .utc()
      .format(T_FORMAT);

    if (
      nextProps.selectedBoxes.items.length <
      this.state.selectedBoxes.items.length
    ) {
      this.setState({ selectedBoxes: nextProps.selectedBoxes });
      this.setState({ fetchNewDataFor: 'NONE' });
      return;
    }

    if (this.state.selectedBoxes !== nextProps.selectedBoxes) {
      this.setState({ selectedBoxes: nextProps.selectedBoxes });
      this.setState({
        fetchNewDataFor: nextProps.selectedBoxes.newItemToRender
      });
    }

    if (
      !moment(propFromDateUTC).isValid() ||
      !moment(propToDateUTC).isValid() ||
      !moment(propFromHoursUTC, T_FORMAT).isValid() ||
      !moment(propToHoursUTC, T_FORMAT).isValid()
    ) {
      return;
    }

    if (
      moment(this.state.fromDate, D_FORMAT).format(D_FORMAT) !==
        propFromDateUTC ||
      moment(this.state.toDate, D_FORMAT).format(D_FORMAT) !== propToDateUTC ||
      moment(this.state.fromHours, T_FORMAT).format(T_FORMAT) !==
        propFromHoursUTC ||
      moment(this.state.toHours, T_FORMAT).format(T_FORMAT) !== propToHoursUTC
    ) {
      const fromDate = propFromDateUTC;
      const toDate = propToDateUTC;
      const fromHours = propFromHoursUTC;
      const toHours = propToHoursUTC;
      this.setState({ fromDate });
      this.setState({ toDate });
      this.setState({ fromHours });
      this.setState({ toHours });
      this.setState({ fetchNewDataFor: 'ALL' });
    }

    if (this.state.timeZone !== nextProps.timeZone) {
      this.setState({ 
        fetchNewDataFor: 'ALL',
        timeZone: nextProps.timeZone 
      });
    }    
  }

  render() {
    if (!this.state.selectedBoxes.items) {
      return null;
    }
    const { timeZone } = this.state;    
    return (
      <Tabs>
        {this.state.selectedBoxes.items.map(box => {
          const { fromDate, fromHours, toDate, toHours } = this.state;
          let url = [
            `http://${REST_API_HOSTNAME}/get_all_obs_from_date_to_date_for_obs_sys?`,
            `obsys=${box.boxName.toUpperCase()}`,
            `&datafrom=${fromDate}`,
            `&h_from=${fromHours}`,
            `&datato=${toDate}`,
            `&h_to=${toHours}`,
            `&time_zone=${timeZone}`
          ].join('');
          return (
            <Tab
              key={String(box.boxName)}
              icon={box.isFetching ? <CircularProgress color={white} /> : null}
              label={box.boxName}
            >
              <TabResultContainer
                key={String(box.boxName)}
                label={box.boxName}
                url={url}
                boxName={box.boxName}
                csv={box.csv}
                fromDate={this.state.fromDate}
                toDate={this.state.toDate}
                fromHours={this.state.fromHours}
                toHours={this.state.toHours}
                fromDateLocal={moment(this.state.fromDate).format(D_FORMAT)}
                toDateLocal={moment(this.state.toDate).format(D_FORMAT)}
                fromHoursLocal={moment(this.state.fromHours).format(T_FORMAT)}
                toHoursLocal={moment(this.state.toHours).format(T_FORMAT)}
                fetchNewDataFor={this.state.fetchNewDataFor}
              />
            </Tab>
          );
        })}
      </Tabs>
    );
  }
}

export default TabbedResults;
