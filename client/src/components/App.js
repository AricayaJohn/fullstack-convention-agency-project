import { Link, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import ConventionAreaForm from "./ConventionAreaForm";

function App() {
  return (
    <main>
      <h1>
        <Link to="/">Convention Agency</Link>
      </h1>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/add-convention-area">
          <ConventionAreaForm />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
