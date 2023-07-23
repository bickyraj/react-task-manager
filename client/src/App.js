import { AuthContext } from "./context/AuthContext.ts";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Profile from "./components/pages/Profile.js";
import { useState } from "react";
import Home from "./components/pages/Home.js";
import Layout from "./components/Layout.js";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="app">
      <AuthContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
