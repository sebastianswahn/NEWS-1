import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalcForm from "./components/CalcForm";
import GraphResults from "./pages/GraphResults";
import Navbar from "./components/Navbar";

function RouterComponent() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CalcForm />} />
        <Route path="/graph" element={<GraphResults />} />
      </Routes>
    </Router>
  );
}

export default RouterComponent;
