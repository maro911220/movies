import { Link, Routes, Route, useLocation } from "react-router-dom";
import Home from "./page/Home";
import Sub from "./page/Sub";
import { IoMdArrowRoundUp, IoMdFlash, IoMdFlashOff } from "react-icons/io";
import { useState } from "react";

function App() {
  let location = useLocation().pathname;
  const [mode, setMode] = useState(true);
  return (
    <>
      <h1 className="blind">main</h1>
      <nav className="header">
        <h2 className="blind">header</h2>
        <div className="header-con">
          <Link to="/">MOVIE</Link>
          <div className="header-btn">
            <button
              className="mode-btn"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setMode(!mode);
              }}
            >
              {mode ? <IoMdFlash /> : <IoMdFlashOff />}
            </button>
            {location == "/" && (
              <button
                className="up-btn"
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <IoMdArrowRoundUp />
              </button>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sub/:id" element={<Sub />} />
      </Routes>
    </>
  );
}

export default App;
