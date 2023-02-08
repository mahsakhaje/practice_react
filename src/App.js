import "./index.css";
import Login from "./pages/login.js";
import Play from "./pages/play.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";

function App() {

  // Authentication Ex. Login
  // Authorization

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if(userInfo && userInfo.username){
    return (
      <Router>
        <Routes>
          <Route path="/play" exact element={<Play />} />
          <Route path='*' element={<>404</>} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path='*' element={<>404</>} />
      </Routes>
    </Router>
  );
}

export default App;
