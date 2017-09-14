import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

//dev. env setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            // loggerMiddleware // neat middleware that logs actions
        ))
);

//prod. env setup
// const store = createStore(
//     rootReducer,
//     applyMiddleware(
//         thunkMiddleware, // lets us dispatch() functions
//     )
// );

export default store;