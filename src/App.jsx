import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotepadPage from "./components/NotepadPage";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container App mt-2">
        <ToastContainer />
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              DNN App
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notepad" element={<NotepadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
