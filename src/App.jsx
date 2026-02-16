import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import NotepadPage from "./pages/NotepadPage";
import Home from "./pages/Home";
import NNListPage from "./pages/NNListPage";
import CADetailsPage from "./components/CADetailsPage";
import SealDetailsPage from "./components/SealDetailsPage";
import HistoryPage from "./pages/HistoryPage";
import PoleAdvancedSearchPage from "./components/PoleAdvancedSearchPage";
import CAMasterDataPage from "./components/CAMasterDataPage";
import SODownloadPage from "./components/SODownloadPage";
import CableLoadTablePage from "./components/CableLoadTablePage";
import SadhnaChartPage from "./components/SadhnaChartPage";
import MeterSealsPage from "./components/MeterSealsPage";
import CancelHoldReasonListPage from "./components/CancelHoldReasonListPage";
import RemarksBuilderPage from "./pages/RemarksBuilderPage";
import HoldRemarksPage from "./components/HoldRemarksPage";
import RenamePdfPage from "./components/RenamePdfPage";
import ClipboardPage from "./pages/ClipboardPage";
import SpreadSheetExplorerPage from "./pages/SpreadSheetExplorerPage";
import PoleRoutePage from "./pages/PoleRoutePage";

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
          <Route path="/soDownload" element={<SODownloadPage />} />
          <Route path="/cableLoadTable" element={<CableLoadTablePage />} />
          <Route path="/sadhnaChart" element={<SadhnaChartPage />} />
          <Route path="/meterSeals" element={<MeterSealsPage />} />
          <Route path="/remarksBuilder" element={<RemarksBuilderPage />} />
          <Route
            path="/cancelHoldReasons"
            element={<CancelHoldReasonListPage />}
          />
          <Route path="/holdRemarks" element={<HoldRemarksPage />} />
          <Route path="/renamePdf" element={<RenamePdfPage />} />
          <Route path="/clipboard" element={<ClipboardPage />} />
          <Route
            path="/spreadsheetExplore"
            element={<SpreadSheetExplorerPage />}
          />
          <Route path="/poleRoute" element={<PoleRoutePage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
