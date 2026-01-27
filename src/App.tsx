import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<h1>Detalhes</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
