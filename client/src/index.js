import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import reducers from "./reducers";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(reducers, {}, applyMiddleware(thunk));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// console.log("Stripe key is", process.env.REACT_APP_STRIPE_KEY);
// console.log("Environment is ", process.env.NODE_ENV);
