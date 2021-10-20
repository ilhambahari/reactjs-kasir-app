import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home, Sukses } from "./pages";

import { NavbarComponent } from "./components";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/sukses" component={Sukses} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}
