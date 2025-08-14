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
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div className="row">
        <h4>Report</h4>
        <textarea
          className="form-control"
          name=""
          id=""
          rows="15"
          value={JSON.stringify(slData, undefined, 2)}
          readOnly
        />
      </div>
    </div>
  );
};

export default MeterSealsPage;
