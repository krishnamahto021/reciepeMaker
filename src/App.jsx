import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Recipe from "./Pages/Recipe";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:rid" element={<Recipe />} />
      </Routes>
    </Router>
  );
};

export default App;
