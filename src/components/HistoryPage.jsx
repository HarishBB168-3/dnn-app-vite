import { useState } from "react";
import http from "./services/httpService";
import { copyToClipboard } from "./services/utilsService";

// Sample data
const items = [
  { id: 1, title: "Item One", description: "This is the first item." },
  { id: 2, title: "Item Two", description: "This is the second item." },
  { id: 3, title: "Item Three", description: "This is the third item." },
];

const HistoryPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);
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
      setHistoryList(data);
    } catch (e) {}
    setIsLoading(false);
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
      </form>

      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <h3>History - NN count : {historyList.length}</h3>

      <div className="row">
        {historyList.length === 0 && (
          <li className="list-group-item">Nothing to show</li>
        )}
        {historyList.map((item) => (
          <div className="col-md-4 mb-4" key={item.NOTIFICATION_NO}>
            <div className="card h-100">
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
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={(e) => {
                    copyToClipboard(item.NOTIFICATION_NO);
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
