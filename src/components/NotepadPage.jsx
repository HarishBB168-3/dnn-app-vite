import { useState } from "react";
import http from "./services/httpService";

function NotepadPage() {
  const [notification, setNotification] = useState(0);
  const [nnNotepad, setNnNotepad] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = "https://api.tatapower-ddl.com/mmg2/Shownotepaddata";

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

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="notification" className="form-label">
            Notification
          </label>
          <input
            type="number"
            className="form-control"
            id="notification"
            aria-describedby="nnHelp"
            onChange={(e) => setNotification(e.target.value)}
          />
          <div id="nnHelp" className="form-text">
            Enter notification no.
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            getNNData(notification);
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

      <ul className="list-group mt-2">
        {nnNotepad.length === 0 && (
          <li className="list-group-item">Nothing to show</li>
        )}
        {nnNotepad.map((item, idx) => {
          return (
            <li className="list-group-item" key={idx}>
              <span className="badge text-bg-primary">{item.notification}</span>
              <br />
              {item.remark}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NotepadPage;
