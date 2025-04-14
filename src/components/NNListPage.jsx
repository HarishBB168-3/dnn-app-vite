import { useState } from "react";
import http from "./services/httpService";
import ServiceOrderCard from "./ServiceOrderCard";
import ServiceOrderAccordion from "./ServiceOrderAccordion";

const NNListPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nnList, setNnList] = useState([]);

  const url = "https://api.tatapower-ddl.com/mmg2/GetCustomerDetailsMMG";

  const payload = {
    userId: "",
    insertedon: 0,
    APK_VERSION: "CMM_2.3.6",
  };

  const getNNList = async () => {
    setIsLoading(true);
    try {
      const result = await http.post(url, { ...payload, userId: userId });
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      setNnList(data);
    } catch (e) {}
    setIsLoading(false);
  };

  return (
    <div className="container">
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
            getNNList();
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
        {nnList.length === 0 && (
          <li className="list-group-item">Nothing to show</li>
        )}

        {nnList.map((item, index) => (
          <ServiceOrderAccordion key={index} data={item} index={index} />
        ))}
        {/* {nnList.map((item, idx) => {
          return (
            <li className="list-group-item" key={idx}>
              <span className="badge text-bg-primary">{"item.remark"}</span>
              <br />
              {JSON.stringify(item)}

              
            </li>
          );
        })} */}
      </ul>
    </div>
  );
};

export default NNListPage;
