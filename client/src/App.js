import { AuthContext } from "./context/AuthContext.ts";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/pages/Profile.js";
import { useState } from "react";
import Home from "./components/pages/Home.js";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="app">
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
            <Switch>
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/" component={Home}/>
            </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
