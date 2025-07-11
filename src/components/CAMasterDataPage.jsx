import { useState } from "react";
import http from "./services/httpService";

const CAMasterDataPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bkendUrl, setBkendUrl] = useState("");
  const [caNo, setCaNo] = useState("");
  const [zone, setZone] = useState("");

  const [data, setData] = useState("");

  const getCAMasterData = async (url, caNo, zone) => {
    setIsLoading(true);
    try {
      const result = await http.get(url, {
        params: { cano: caNo, zone: zone },
      });
      console.log("Status : ", result.status);
      console.log(result.data);
      setData(JSON.stringify(result.data));
    } catch (e) {
      console.log(e.response.data);
      setData(JSON.stringify(e.response.data));
    }
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1>CADetailsPage</h1>

      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="bkendUrl"
            placeholder="Backend URL"
            value={bkendUrl}
            onChange={(e) => setBkendUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="cano"
            placeholder="CA No."
            value={caNo}
            onChange={(e) => setCaNo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="zone"
            placeholder="Zone"
            value={zone}
            onChange={(e) => setZone(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            getCAMasterData(bkendUrl, caNo, zone);
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
        <h4>Details</h4>
        <textarea
          className="form-control"
          name=""
          id=""
          rows="15"
          value={data}
          readOnly
        />
      </div>
    </div>
  );
};

export default CAMasterDataPage;
