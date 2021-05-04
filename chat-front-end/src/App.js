import Chatbar from "./components/Chatbar";
import Sidebar from "./components/Sidebar";
import React, { useEffect, useState } from "react";
import axios from "./api/axios";

import "./App.css";
import { useStateProviderValue } from "./StateProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./utils/Login.js";

function App() {
  const [{ user }, dispatch] = useStateProviderValue();
  

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Switch>
              <Route path="/rooms/:roomId">
                <Sidebar />
                <Chatbar />
              </Route>
              <Route path="/">
                <Sidebar />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
