import { Link, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Sub from "./page/Sub";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [mode, setMode] = useState(true);
  return (
    <>
      <h1 className="blind">main</h1>
      {/* 공통 헤더 */}
      <nav className="header">
        <h2 className="blind">header</h2>
        <div className="header-con">
          <Link to="/">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="logo" />
            <span>movies</span>
          </Link>
          <div className="header-btn">
            <motion.button
              className="mode-btn"
              onClick={() => {
                document.documentElement.classList.toggle("dark");
                setMode(!mode);
              }}
              initial={{ filter: "brightness(1)" }}
              whileHover={{ filter: "brightness(1.2)" }}
            >
              <span className="blind">화면 모드 변경</span>
              {mode ? <MdLightMode /> : <MdNightlight />}
            </motion.button>
            <motion.a
              href="https://github.com/maro911220"
              target="_blank"
              className="mode-btn"
              rel="noreferrer"
              initial={{ filter: "brightness(1)" }}
              whileHover={{ filter: "brightness(1.2)" }}
            >
              <span className="blind">화면 모드 변경</span>
              <AiFillGithub />
            </motion.a>
          </div>
        </div>
      </nav>
      {/* 페이지 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sub/:id" element={<Sub />} />
      </Routes>
    </>
  );
}

export default App;
