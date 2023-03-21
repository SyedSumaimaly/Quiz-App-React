import Screen from "./components/Screen";
import Quiz from "./components/Quiz";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Result from "./components/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Screen />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
