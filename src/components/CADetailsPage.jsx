import { useState } from "react";
import http from "./services/httpService";
import CustomerCard from "./CustomerCard";

const searchTypes = [
  { name: "ca", label: "CA No." },
  { name: "installation", label: "Installation No." },
  { name: "meter", label: "Meter No." },
];

const CADetailsPage = () => {
  const [searchType, setSearchType] = useState(
    searchTypes.find((i) => i.name === "ca")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [proxy, setProxy] = useState("");
  const [port, setPort] = useState("");
  const [useProxy, setUseProxy] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const url = "http://103.178.97.26:8070/cmgsrv2/neighbouring_Ca";
  const url = "http://dnn-app.alwaysdata.net/get-external-data/";

  const getPayload = () => {
    if (searchType.name === "ca") return { cano: searchTerm };
    else if (searchType.name === "installation")
      return { INSTALLATION: searchTerm };
    else if (searchType.name === "meter") return { METER_NO: searchTerm };
  };

  const getCADetails = async () => {
    setIsLoading(true);
    try {
      let result = null;
      if (useProxy)
        result = await http.get(
          url +
            "?" +
            Object.entries(getPayload())
              .map(([key, value]) => `${key}=${value}`)
              .join("&") +
            `&proxy=${proxy}&port=${port}`
        );
      result = await http.get(
        url +
          "?" +
          Object.entries(getPayload())
            .map(([key, value]) => `${key}=${value}`)
            .join("&")
      );
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      setSearchResult(data);
    } catch (e) {}
    setIsLoading(false);
  };

  return (
    <div className="container">
      <h6>CA Details</h6>

      <div className="d-flex gap-2">
        {searchTypes.map((item, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name="searchType"
              id={item.name}
              onChange={() => setSearchType(item)}
              checked={item.name === searchType.name}
            />
            <label className="form-check-label" htmlFor={item.name}>
              {item.label}
            </label>
          </div>
        ))}
      </div>

      <form>
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label">
            {searchType.label}
          </label>
          <input
            type="text"
            className="form-control"
            id="searchInput"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={searchType.label}
          />
          <label htmlFor="proxyInput" className="from-label">
            Proxy
          </label>
          <input
            type="text"
            className="form-control"
            id="proxyInput"
            onChange={(e) => setProxy(e.target.value)}
            value={proxy}
            placeholder="Proxy"
          />
          <label htmlFor="portInput" className="from-label">
            Port
          </label>
          <input
            type="text"
            className="form-control"
            id="portInput"
            onChange={(e) => setPort(e.target.value)}
            value={port}
            placeholder="Port"
          />

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={useProxy}
              onChange={(e) => setUseProxy(e.target.checked)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Use Proxy
            </label>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            getCADetails();
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

      {searchResult.length > 0 && <CustomerCard customer={searchResult[0]} />}
    </div>
  );
};

export default CADetailsPage;
