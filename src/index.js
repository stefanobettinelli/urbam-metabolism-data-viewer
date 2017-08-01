import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import store from "./store";

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
    module.hot.accept()
}
