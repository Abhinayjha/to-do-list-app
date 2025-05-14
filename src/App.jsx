import { useState } from "react";
import "./App.css";
import { Home } from "./components/Home";
import { Title } from "./components/Title";
import { Test } from "./components/Test";

function App() {
  return (
    <div className="bodyContainer">
      <Title />
      <Home />
      <Test />
    </div>
  );
}

export default App;
