import "./index.css";

import Login from "./pages/login.js";
import Play from "./pages/play.js";
import Game from "./pages/game.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/play" exact element={<Play />} />
          <Route
            path="/game"
            exact
            element={
              <Provider store={store}>
                <Game />
              </Provider>
            }
          />
        </Routes>
      </Router>
  );
}

export default App;
