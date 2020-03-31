import React from "react";
import logo from "./logo.svg";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={MoviesList} />
            <Route exact path="/movie_details/:id" component={MovieDetails} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
