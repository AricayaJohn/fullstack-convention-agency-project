import {Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";
import ConventionAreaForm from "./ConventionAreaForm";
import ConventionsPage from "./ConventionsPage";

function App() {
  return (
    <Router>
      <main>
        <h1>
          Convention Agency
        </h1>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/add-convention-area">
            <ConventionAreaForm />
          </Route>
          <Route path="/conventions/:id">
            <ConventionsPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
