import { Link, Routes, Route, useLocation } from "react-router-dom";
import Home from "./page/Home";
import Sub from "./page/Sub";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function App() {
  const location = useLocation();
  return (
    <>
      <nav className="header">
        <Link to="/">Home</Link>
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
