import "./App.css";
import React from "react";
import Home from "./components/home";
import Model from "./components/model";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";

library.add(fas);

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model" element={<Model />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
