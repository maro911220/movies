import { Link, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Sub from "./page/Sub";

function App() {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sub/:id" element={<Sub />} />
      </Routes>
    </>
  );
}

export default App;
