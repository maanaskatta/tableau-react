import { Switch, Route, Redirect } from "react-router-dom";
import Analytics from "./pages/Analytics";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Switch>
      <Route path="/login" component={() => <LoginPage />} />
      <Route path="/analytics" component={() => <Analytics />} />
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
