import { Link, Routes, Route, useLocation } from "react-router-dom";
import Home from "./page/Home";
import Sub from "./page/Sub";
import {
  TiAdjustBrightness,
  TiWeatherNight,
  TiArrowUpOutline,
} from "react-icons/ti";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useState } from "react";

function App() {
  const location = useLocation();
  const [mode, setMode] = useState(true);
  return (
    <>
      <nav className="header">
        <div className="header-con">
          <Link to="/">Home</Link>
          <div className="header-btn">
            <button
              className="mode-btn"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setMode(!mode);
              }}
            >
              {mode ? <TiWeatherNight /> : <TiAdjustBrightness />}
            </button>
            <button
              className="up-btn"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <TiArrowUpOutline />
            </button>
          </div>
        </div>
      </nav>
      <TransitionGroup className="transition-group">
        <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sub/:id" element={<Sub />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

export default App;
