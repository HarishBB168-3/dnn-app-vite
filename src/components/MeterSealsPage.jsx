import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import http from "./services/httpService";

const MeterSealsPage = () => {
  const [mNo, setMNo] = useState("");
  const [slData, setSlData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const url = "https://api.tatapower-ddl.com/mmg2/showoldseal";

  const getSlData = async (mNo) => {
    setIsLoading(true);
    try {
      const result = await http.post(url, { meternumber: mNo });
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      setSlData(data);
    } catch (e) {}
    setIsLoading(false);
  };

  useEffect(() => {
    const mNo = queryParams.get("mNo");

    if (mNo) {
      // ? Query params are present
      console.log("Getting mNo from url with:", { mNo });

      setMNo(mNo);
      getSlData(mNo);
      // Put your logic here, e.g.:
      // fetchData(type, value);
    } else {
      // ?? Missing query params
      console.log("Default mNo page");
    }
  }, [search]); // re-run if the query string changes

  return (
    <div>
      <h3>Meter Seals</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="mNo" className="form-label">
            Meter No
          </label>
          <input
            type="text"
            className="form-control"
            id="mNo"
            aria-describedby="mNoHelp"
            value={mNo}
            onChange={(e) => setMNo(e.target.value)}
          />
          <div id="mNoHelp" className="form-text">
            Enter meter no.
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            getSlData(mNo);
          }}
        >
          Submit
        </button>
      </form>

      {isLoading && (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="row">
        <h4>Report</h4>

        {slData.length === 0 && !isLoading && (
          <div className="text-muted">No data available.</div>
        )}

        <div className="accordion" id="sealAccordion">
          {slData.map((item, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  aria-expanded="false"
                  aria-controls={`collapse-${index}`}
                >
                  Seal: {item.ZSSERNR || "N/A"} -&gt; {item.ZPOSITION || "N/A"}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${index}`}
                data-bs-parent="#sealAccordion"
              >
                <div className="accordion-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <strong>Meter No:</strong> {item.OLD_METER_NO || "N/A"}
                    </li>
                    <li className="list-group-item">
                      <strong>ZEQUNR:</strong> {item.ZEQUNR}
                    </li>
                    <li className="list-group-item">
                      <strong>Status:</strong> {item.ZUSTAT}
                    </li>
                    <li className="list-group-item">
                      <strong>Order:</strong> {item.ZORDER || "?"}
                    </li>
                    <li className="list-group-item">
                      <strong>Issue To:</strong> {item.ZISS_TO || "?"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeterSealsPage;
