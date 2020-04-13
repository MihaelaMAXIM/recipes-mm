import React, { Component } from "react";
import Antet from "./antet";
import Nav from "./nav";
import ActivityRecipes from "./activity-recipes";
import ActivityMeals from "./activity-meals";
import ActivityIngredients from "./activity-ingredients";
import Home from "./home";
import { Route, Switch } from "react-router-dom";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      retete: [],
      ingrediente: []
    };

    this.reincarc = this.reincarc.bind(this);
    this.reincarcIng = this.reincarcIng.bind(this);
  }

  reincarc() {
    return fetch("http://localhost/dbrecipes/api/retete.php")
      .then(rezultat => {
        return rezultat.json();
      })
      .then(listaRetete => this.setState({ retete: listaRetete }))
      .catch(error => console.log("Request failed: ", error));
  }

  reincarcIng() {
    return fetch("http://localhost/dbrecipes/api/ingrediente.php")
      .then(rezultat => {
        return rezultat.json();
      })
      .then(listaIngrediente =>
        this.setState({ ingrediente: listaIngrediente })
      )
      .catch(error => console.log("Request failed: ", error));
  }

  componentDidMount() {
    this.reincarc();
    this.reincarcIng();
  }

  render() {
    return (
      <>
        <Antet />
        <div>
          <div className="row">
            <div className="col-md-2">
              <Nav />
            </div>
            <div className="col-md-10">
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route
                  exact
                  path="/masa"
                  render={props => (
                    <div>
                      <ActivityMeals retete={this.state.retete} />
                    </div>
                  )}
                />
                <Route
                  exact
                  path="/adauga-reteta"
                  render={props => (
                    <div>
                      <ActivityIngredients
                        ingrediente={this.state.ingrediente}
                      />
                    </div>
                  )}
                />
                <div className="paddingtop">
                  <div className="card-columns">
                    <Route
                      exact
                      path="/retete"
                      render={props => (
                        <div>
                          <ActivityRecipes retete={this.state.retete} />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </Switch>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
