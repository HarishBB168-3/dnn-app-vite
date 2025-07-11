import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotepadPage from "./components/NotepadPage";
import Home from "./components/Home";
import NNListPage from "./components/NNListPage";
import "./App.css";
import CADetailsPage from "./components/CADetailsPage";
import SealDetailsPage from "./components/SealDetailsPage";
import HistoryPage from "./components/HistoryPage";
import PoleAdvancedSearchPage from "./components/PoleAdvancedSearchPage";
import CAMasterDataPage from "./components/CAMasterDataPage";

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
          <Route path="/notepad" element={<NotepadPage />} />
          <Route path="/nnlist" element={<NNListPage />} />
          <Route path="/cadetails" element={<CADetailsPage />} />
          <Route path="/camdata" element={<CAMasterDataPage />} />
          <Route path="/sllist" element={<SealDetailsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/poleAdvSearch" element={<PoleAdvancedSearchPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
