import { useEffect, useState } from "react";
import http from "./services/httpService";
import { copyToClipboard, ensureJsonStrict } from "./services/utilsService";

const statusToBgClass = {
  Done: "bg-success text-white",
  CANCEL: "bg-danger text-white",
  default: "bg-light text-dark",
};

const backupMtrTypeList = [
  { id: 0, value: "Poly", label: "Poly" },
  { id: 1, value: "CT", label: "CT" },
  { id: 2, value: "Single to Poly", label: "Single to Poly" },
  { id: 3, value: "Poly to Single", label: "Poly to Single" },
  { id: 4, value: "Poly to CT", label: "Poly to CT" },
  { id: 5, value: "CT to Poly", label: "CT to Poly" },
  { id: 6, value: "CT 100/5", label: "CT 100/5" },
  { id: 7, value: "CT 200/5", label: "CT 200/5" },
  { id: 8, value: "CT 400/5", label: "CT 400/5" },
];

const backupWorkTypeList = [
  { id: 0, value: "NC", label: "NC" },
  { id: 1, value: "Mass", label: "Mass" },
  { id: 2, value: "Load Enh.", label: "Load Enh." },
  { id: 3, value: "Faulty", label: "Faulty" },
  { id: 4, value: "Box Change", label: "Box Change" },
  { id: 5, value: "Burnt", label: "Burnt" },
  { id: 6, value: "Cable change", label: "Cable change" },
  { id: 7, value: "Load Viol.", label: "Load Viol." },
  { id: 8, value: "LTT Moveout", label: "LTT Moveout" },
  { id: 9, value: "Meter Stop", label: "Meter Stop" },
  { id: 10, value: "Moveout", label: "Moveout" },
  { id: 11, value: "Net Meter", label: "Net Meter" },
  { id: 12, value: "Check Meter", label: "Check Meter" },
  { id: 13, value: "Resealing", label: "Resealing" },
  { id: 14, value: "Shifting", label: "Shifting" },
  { id: 14, value: "TD MRO", label: "TD MRO" },
  { id: 15, value: "Pre/Post", label: "Pre/Post" },
  { id: 14, value: "RO", label: "RO" },
];

const STORAGE_KEY = "history_page";

const HistoryPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [caseReportList, setCaseReportList] = useState([]);
  const [reportText, setReportText] = useState("");
  const [reportLastLine, setReportLastLine] = useState("");
  const [holdCount, setHoldCount] = useState(0);
  const [settingsUrl, setSettingsUrl] = useState("");
  const [mtrTypeList, setMtrTypeList] = useState(backupMtrTypeList);
  const [workTypeList, setWorkTypeList] = useState(backupWorkTypeList);
  const [hasLoaded, setHasLoaded] = useState(false);

  const url = "https://api.tatapower-ddl.com/mmg2/HistoryNotiMMG";
  const urlProtocol =
    "https://api.tatapower-ddl.com/mmgportal/main_forms/fromGenerateProtocol_mob.aspx?son=";

  const payload = {
    userId: "",
  };

  const getHistoryList = async () => {
    setIsLoading(true);
    try {
      const result = await http.post(url, { ...payload, userId: userId });
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      const sortedItems = [...data].sort((a, b) =>
        b.insertedon.localeCompare(a.insertedon)
      );
      setHistoryList(sortedItems);

      const mCaseReportList = sortedItems.map((obj) => {
        return {
          NOTIFICATION_NO: obj.NOTIFICATION_NO.slice(2),
          Hold_Cancel_type: obj.Hold_Cancel_type,
          mtrType: "",
          workType: "",
          SRV_ORD_NO: obj.SRV_ORD_NO,
        };
      });
      setCaseReportList(mCaseReportList);
    } catch (e) {}
    setIsLoading(false);
  };

  const prepareReport = () => {
    const doneItems = caseReportList
      .filter(
        (item) =>
          item.Hold_Cancel_type === "Done" && item.mtrType && item.workType
      )
      .map(
        (item) => `${item.NOTIFICATION_NO} ${item.mtrType} ${item.workType}`
      );

    const cancelItems = caseReportList
      .filter(
        (item) =>
          item.Hold_Cancel_type === "CANCEL" && item.mtrType && item.workType
      )
      .map((item) => item.NOTIFICATION_NO);

    const reportParts = [...doneItems, ""];

    if (cancelItems.length > 0) {
      reportParts.push("Cancel", ...cancelItems, "");
    }

    if (holdCount > 0) reportParts.push(`${holdCount} Hold`, "");

    reportParts.push(reportLastLine);

    const report = reportParts.join("\n");

    setReportText(report);
  };

  const copyReport = () => {
    copyToClipboard(reportText);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("Loaded");
        console.log(parsed);
        if (parsed.settingsUrl) setSettingsUrl(parsed.settingsUrl);
        if (parsed.mtrTypeList) setMtrTypeList(parsed.mtrTypeList);
        if (parsed.workTypeList) setWorkTypeList(parsed.workTypeList);
      }
    } catch (e) {
      console.error("Failed to load saved state", e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    try {
      const stateToSave = {
        settingsUrl,
        mtrTypeList,
        workTypeList,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      console.log("state saved");
      console.log(JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }, [settingsUrl, mtrTypeList, workTypeList]);

  const getDataFromUrl = async (mUrl) => {
    setIsLoading(true);
    try {
      const result = await http.get(mUrl);
      console.log("Status : ", result.status);
      console.log(result);
      const data = ensureJsonStrict(result.data);
      console.log("Parsed successfully");
      setMtrTypeList(data.mtrType);
      setWorkTypeList(data.workType);
    } catch (e) {}
    setIsLoading(false);
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="input-group mb-3">
          <span className="input-group-text" id="labelUserID">
            User Id
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="User Id"
            aria-label="User Id"
            aria-describedby="labelUserID"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            getHistoryList();
          }}
        >
          Submit
        </button>
        <br />
        <button
          type="submit"
          className="btn btn-sm btn-info my-2"
          onClick={(e) => {
            e.preventDefault();
            prepareReport();
          }}
        >
          Prepare Report
        </button>
      </form>

      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {reportText && (
        <div className="row">
          <h4>Report</h4>

          <div className="input-group mb-3">
            <span className="input-group-text" id="settings">
              Settings Source Url
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Settings Source Url"
              aria-label="Settings Source Url"
              aria-describedby="settings"
              id="settings"
              value={settingsUrl}
              onChange={(e) => setSettingsUrl(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                getDataFromUrl(settingsUrl);
              }}
            >
              Load Settings
            </button>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="lastLineLabel">
              Last line
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Last line"
              aria-label="Last line"
              aria-describedby="lastLineLabel"
              id="lastLine"
              value={reportLastLine}
              onChange={(e) => setReportLastLine(e.target.value)}
            />
          </div>

          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="holdCountSelect">
              Hold Count
            </label>
            <select
              className="form-select"
              id="holdCountSelect"
              value={holdCount}
              onChange={(e) => setHoldCount(Number(e.target.value))}
            >
              {Array.from({ length: 21 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div className="col-auto align-self-start">
            <button
              type="submit"
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                e.preventDefault();
                copyReport();
              }}
            >
              Copy Report
            </button>
            <button
              type="submit"
              className="btn mx-2 btn-sm btn-info"
              onClick={(e) => {
                e.preventDefault();
                setReportText("");
              }}
            >
              <i className="bi bi-arrows-collapse"></i>
            </button>
          </div>

          <textarea
            className="form-control"
            name=""
            id=""
            rows="15"
            value={reportText}
            readOnly
          />
        </div>
      )}
      <h3>History - NN count : {historyList.length}</h3>

      <div className="row">
        {historyList.length === 0 && (
          <li className="list-group-item">Nothing to show</li>
        )}
        {historyList.map((item, idx) => (
          <div className="col-md-4 mb-4" key={item.NOTIFICATION_NO}>
            <div
              className={`card h-100 ${
                statusToBgClass[item.Hold_Cancel_type] ||
                statusToBgClass.default
              }`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title">{item.NOTIFICATION_NO}</h5>
                  <a
                    className="rounded bg-warning p-2"
                    href={urlProtocol + item.SRV_ORD_NO}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.SRV_ORD_NO}
                  </a>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="card-text">{item.Hold_Cancel_type}</span>
                  <span className="card-text">{item.insertedon}</span>
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="mtrType">
                    Mtr Type
                  </label>
                  <select
                    className="form-select"
                    id="mtrType"
                    value={caseReportList[idx].mtrType}
                    onChange={(e) => {
                      const newCaseReportList = [...caseReportList];
                      newCaseReportList[idx].mtrType = e.target.value;
                      setCaseReportList(newCaseReportList);
                      console.log("Selected Mtr Type:", e.target.value, idx);
                    }}
                  >
                    <option value="">-- Select Mtr Type --</option>
                    {mtrTypeList.map((item, idx) => (
                      <option key={idx} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group mb-3">
                  <label className="input-group-text" htmlFor="workType">
                    Work Type
                  </label>
                  <select
                    className="form-select"
                    id="workType"
                    value={caseReportList[idx].workType}
                    onChange={(e) => {
                      const newCaseReportList = [...caseReportList];
                      newCaseReportList[idx].workType = e.target.value;
                      setCaseReportList(newCaseReportList);
                    }}
                  >
                    <option value="">-- Select Work Type --</option>
                    {workTypeList.map((item, idx) => (
                      <option key={idx} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    window.open(
                      "/notepad?nn=" + item.NOTIFICATION_NO,
                      "_blank"
                    );
                  }}
                >
                  Notepad
                </button>
                <button
                  className="btn btn-info btn-sm ms-2 rounded"
                  onClick={(e) => {
                    copyToClipboard(item.NOTIFICATION_NO.slice(2));
                  }}
                >
                  Copy NN
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
