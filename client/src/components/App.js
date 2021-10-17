import React from "react";
import GooleAuth from "./GooleAuth";
import List from "./List";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={GooleAuth} />
        <Route path="/data" exact component={List} />
      </Switch>
    </Router>
  );
}

export default App;
