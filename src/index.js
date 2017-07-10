import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import obsTableApp from './reducers';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const store = createStore(obsTableApp);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

console.log(store.getState());

registerServiceWorker();

if (module.hot) {
    module.hot.accept()
}
