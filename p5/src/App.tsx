import React, { useEffect } from "react";
import "./App.css";
import { ExerciseI1 } from "./sketches/NatureOfCode/ExerciseI1";
function App() {
  useEffect(() => {
    new ExerciseI1().create();
  }, []);
  return <div id="container"></div>;
}

export default App;
