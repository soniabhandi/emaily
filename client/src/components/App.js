import { Component } from "react";
import {} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import {
  BrowserRouter,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";

import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>;

const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing}></Route>
            <Route exact path="/surveys/new" component={SurveyNew}></Route>
            <Route exact path="/surveys" component={Dashboard}></Route>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
