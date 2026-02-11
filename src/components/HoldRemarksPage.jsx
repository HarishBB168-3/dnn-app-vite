import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import http from "./services/httpService";

const HoldRemarksPage = () => {
  const [notification, setNotification] = useState(0);
  const [nnNotepad, setNnNotepad] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [holdRemark, setHoldRemark] = useState("");
  const [idToUse, setIdToUse] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const url = "https://api.tatapower-ddl.com/mmg2/Shownotepaddata";
  const holdUrl = "https://api.tatapower-ddl.com/mmg2/holdcanceldata";

  const isHoldBtnDisabled = holdRemark.trim().length === 0;

  const getNNData = async (nn) => {
    setIsLoading(true);
    try {
      const result = await http.post(url, { notification: nn });
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      setNnNotepad(data);
    } catch (e) {}
    setIsLoading(false);
  };

  const clearRemarkInputNRefresh = () => {
    setHoldRemark("");
    getNNData(notification);
  };

  const holdNN = async (nn, text, id) => {
    setIsLoading(true);
    try {
      const [year, month, day] = selectedDate.split("-");
      const result = await http.post(holdUrl, {
        HOLD_CANCEL_REMARK: text,
        HOLD_CANCEL_DATE: `${day}-${month}-${year}`,
        NOTIFICATION_NO: nn,
        ENG_ID: id,
      });
    } catch (e) {}
    setIsLoading(false);
    clearRemarkInputNRefresh();
  };

  useEffect(() => {
    const nn = queryParams.get("nn");

    if (nn) {
      // ? Query params are present
      console.log("Getting nn from url with:", { nn });

      setNotification(nn);
      getNNData(nn);
      // Put your logic here, e.g.:
      // fetchData(type, value);
    } else {
      // ?? Missing query params
      console.log("Default nn page");
    }
  }, [search]); // re-run if the query string changes

  return (
    <div className="container">
      <h2>Hold Remarks Page</h2>

      <form>
        <div className="mb-3">
          <div className="input-group mb-3">
            <button
              type="submit"
              id="nnSubmitBtn"
              className="btn btn-outline-secondary"
              disabled={isLoading}
              onClick={(e) => {
                e.preventDefault();
                getNNData(notification);
              }}
            >
              Submit
            </button>
            <input
              type="number"
              className="form-control"
              placeholder="Notification no."
              id="notification"
              aria-label="Notification no"
              aria-describedby="nnSubmitBtn"
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
            />
          </div>
        </div>
      </form>

      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div
        className="d-flex flex-column border mt-4"
        style={{ height: "75vh" }}
      >
        <div className="h-50 p-1 d-flex flex-column overflow-auto border-bottom">
          {nnNotepad.length === 0 && (
            <div className="text-muted">Nothing to show</div>
          )}
          {nnNotepad.map((item, i) => (
            <p
              key={i}
              className={`mb-0 px-2 py-1 ${
                i % 2 === 0 ? "bg-info-subtle" : "bg-white"
              }`}
            >
              {item.remark}
            </p>
          ))}
        </div>

        <div className="h-50 position-relative overflow-auto border p-0">
          <div className="w-100 h-100 px-3 pt-3">
            <textarea
              className="form-control mb-2"
              rows={3}
              placeholder="Enter text..."
              value={holdRemark}
              onChange={(e) => setHoldRemark(e.target.value)}
            />

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-primary flex-shrink-0"
                disabled={isLoading || isHoldBtnDisabled || !selectedDate}
                onClick={(e) => {
                  e.preventDefault();
                  holdNN(notification, holdRemark, idToUse);
                }}
              >
                Hold
              </button>
              <input
                type="text"
                className="form-control"
                placeholder="id to use (leave empty if na)"
                id="userIdToUse"
                value={idToUse}
                onChange={(e) => setIdToUse(e.target.value)}
              />
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => {
                  console.log("Selected date old : ", selectedDate);
                  setSelectedDate(e.target.value);
                  console.log("Target value : ", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldRemarksPage;
