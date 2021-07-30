import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from './compenents/Nav';
import './index.css';
import reportWebVitals from './reportWebVitals';
import City from './screens/City';
import Home from './screens/Home';
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./store/store";
import Search from "./screens/Search";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Nav />
                <Route exact path="/" component={Home} />
                <Route path="/search" component={Search} />
                <Route exact path="/city/:city" component={City} />
            </Router>
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
