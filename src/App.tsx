import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/movie/:id" element={<h1>Detalhes</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
