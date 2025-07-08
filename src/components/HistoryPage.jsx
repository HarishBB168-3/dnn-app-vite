import { useState } from "react";
import http from "./services/httpService";
import { copyToClipboard } from "./services/utilsService";

const statusToBgClass = {
  Done: "bg-success text-white",
  CANCEL: "bg-danger text-white",
  default: "bg-light text-dark",
};

const HistoryPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [caseReportList, setCaseReportList] = useState([]);
  const [reportText, setReportText] = useState("");
  const [reportLastLine, setReportLastLine] = useState("");

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

    const report = [
      ...doneItems,
      "",
      "Cancel",
      ...cancelItems,
      "",
      reportLastLine,
    ].join("\n");

    setReportText(report);
  };

  const bulkDownload = () => {
    alert("Starting download");

    const itemsToDownload = caseReportList
      .filter((item) => item.mtrType && item.workType)
      .map((item) => urlProtocol + item.SRV_ORD_NO);

    alert(JSON.stringify(itemsToDownload));
    // Open all immediately
    for (let i = 0; i < itemsToDownload.length; i++) {
      window.open(itemsToDownload[i], "_blank");
    }
    alert("Downloaded successfully");
  };

  const copyReport = () => {
    copyToClipboard(reportText);
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User Id
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
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
        <button
          type="submit"
          className="btn btn-sm btn-warning mx-2"
          onClick={(e) => {
            e.preventDefault();
            bulkDownload();
          }}
        >
          Bulk download
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
          <textarea
            className="form-control"
            name=""
            id=""
            rows="15"
            value={reportText}
            readOnly
          />
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
          </div>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">
              Last line
            </label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={reportLastLine}
              onChange={(e) => setReportLastLine(e.target.value)}
            />
          </div>
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
                <h5 className="card-title">{item.NOTIFICATION_NO}</h5>
                <a
                  href={urlProtocol + item.SRV_ORD_NO}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.SRV_ORD_NO}
                </a>
                <p className="card-text">{item.Hold_Cancel_type}</p>
                <p className="card-text">{item.insertedon}</p>
                <label htmlFor="mtrType" className="form-label">
                  Choose Mtr Type
                </label>
                <select
                  id="mtrType"
                  className="form-select"
                  value={caseReportList[idx].mtrType}
                  onChange={(e) => {
                    const newCaseReportList = [...caseReportList];
                    newCaseReportList[idx].mtrType = e.target.value;
                    setCaseReportList(newCaseReportList);
                    console.log("Selected Mtr Type:", e.target.value, idx);
                  }}
                >
                  <option value="">-- Select Mtr Type --</option>
                  <option value="Poly">Poly</option>
                  <option value="CT">CT</option>
                  <option value="Single to Poly">Single to Poly</option>
                  <option value="Poly to Single">Poly to Single</option>
                  <option value="Poly to CT">Poly to CT</option>
                  <option value="CT to Poly">CT to Poly</option>
                </select>
                <label htmlFor="workType" className="form-label">
                  Choose Work Type
                </label>
                <select
                  id="workType"
                  className="form-select"
                  value={caseReportList[idx].workType}
                  onChange={(e) => {
                    const newCaseReportList = [...caseReportList];
                    newCaseReportList[idx].workType = e.target.value;
                    setCaseReportList(newCaseReportList);
                  }}
                >
                  <option value="">-- Select Work Type --</option>
                  <option value="NC">NC</option>
                  <option value="LE">LE</option>
                  <option value="Mass">Mass</option>
                  <option value="TD MRO">TD MRO</option>
                  <option value="LV">LV</option>
                  <option value="Faulty">Faulty</option>
                  <option value="Moveout">Moveout</option>
                  <option value="Cable change">Cable change</option>
                  <option value="Box Change">Box Change</option>
                  <option value="Resealing">Resealing</option>
                </select>
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
