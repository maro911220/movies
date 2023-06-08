import { Link, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Sub from "./page/Sub";

function App() {
  return (
    <>
      <haeder className="header">
        <Link to="/">Home</Link>
      </haeder>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sub/:id" element={<Sub />} />
      </Routes>
    </>
  );
}

export default App;
