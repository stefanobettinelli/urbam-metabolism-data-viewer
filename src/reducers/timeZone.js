import { TIME_ZONE_CHANGED } from '../actions';

const timeZone = (state = 'UTC', action) => {
  switch(action.type) {
    case TIME_ZONE_CHANGED:
      return action.timeZone;
    default:
      return state;
  }
};

export default timeZone;
