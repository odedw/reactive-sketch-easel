import React, { useEffect } from "react";
import "./App.css";
import { ExerciseI1 } from "./sketches/NatureOfCode/Exercise-I-1";
import { ExerciseI4 } from "./sketches/NatureOfCode/Exercise-I-4";
function App() {
  useEffect(() => {
    // new ExerciseI1().create();
    // new ExerciseI4().create();
  }, []);
  return <div id="container"></div>;
}

export default App;
