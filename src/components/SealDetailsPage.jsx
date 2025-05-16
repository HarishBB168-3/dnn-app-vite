import { useState } from "react";
import http from "./services/httpService";

// Sample data
const items = [
  { id: 1, title: "Item One", description: "This is the first item." },
  { id: 2, title: "Item Two", description: "This is the second item." },
  { id: 3, title: "Item Three", description: "This is the third item." },
];

const SealDetailsPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sealList, setSealList] = useState([]);
  const url = "https://api.tatapower-ddl.com/mmg2/getsealagainsteng";

  const payload = {
    empid: "",
    emptype: "ENG",
  };

  const getSealList = async () => {
    setIsLoading(true);
    try {
      const result = await http.post(url, { ...payload, empid: userId });
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      setSealList(data);
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
            getSealList();
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
      <h3>Total Seals : {sealList.length}</h3>

      <div className="row">
        {sealList.length === 0 && (
          <li className="list-group-item">Nothing to show</li>
        )}
        {sealList.map((item) => (
          <div className="col-md-4 mb-4" key={item.sealno}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.sealno}</h5>
                <p className="card-text">{item.internal_Seal_no}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SealDetailsPage;
