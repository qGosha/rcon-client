import "src/config/init";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Store from "src/Store";

import App from "src/components/App";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
