import { useEffect, useState } from "react";
import http from "./services/httpService";
import { copyToClipboard, ensureJsonStrict } from "./services/utilsService";

const STORAGE_KEY = "remarks_builder_state";

const RemarksBuilderPage = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remarksList, setRemarksList] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("Loaded");
        console.log(parsed);
        if (parsed.url) setUrl(parsed.url);
        if (parsed.remarksList) setRemarksList(parsed.remarksList);
      }
    } catch (e) {
      console.error("Failed to load saved state", e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    try {
      const stateToSave = {
        url,
        remarksList,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      console.log("state saved");
      console.log(JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }, [url, remarksList]);

  const getDataFromUrl = async (mUrl) => {
    setIsLoading(true);
    try {
      const result = await http.get(mUrl);
      console.log("Status : ", result.status);
      console.log(result);
      const data = ensureJsonStrict(result.data);
      console.log("Parsed successfully");
      const normalizedData = data.map((item) => {
        const existing = remarksList.find((r) => r.id === item.id);
        return {
          ...item,
          checked: existing ? existing.checked : false,
        };
      });

      console.log(normalizedData);
      setRemarksList(normalizedData);
    } catch (e) {}
    setIsLoading(false);
  };

  const toggleRemark = (id) => {
    setRemarksList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const buildRemarkAndCopy = () => {
    const selectedRemarks = remarksList.filter((r) => r.checked);
    const combinedRemarksText = selectedRemarks
      .map((r) => r.remarkPoint)
      .join(", ");
    copyToClipboard(combinedRemarksText);
  };

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input
            type="text"
            className="form-control"
            id="url"
            aria-describedby="nnHelp"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div id="nnHelp" className="form-text">
            Enter url
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            getDataFromUrl(url);
          }}
        >
          Submit
        </button>

        <button
          className="btn btn-success mx-2"
          onClick={(e) => {
            e.preventDefault();
            buildRemarkAndCopy();
          }}
        >
          Build
        </button>
      </form>

      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {/* Remarks List */}
      <div
        className="mt-4"
        style={{
          maxHeight: "70vh",
          overflowY: "auto",
          scrollBehavior: "smooth",
          paddingRight: "4px",
        }}
      >
        <div className="list-group">
          <div className="mt-4">
            <div className="list-group">
              {remarksList.map((remark) => (
                <div
                  key={remark.id}
                  className="list-group-item d-flex align-items-center border border-primary border-opacity-25"
                >
                  <div className="form-check w-100">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`remark-${remark.id}`}
                      checked={remark.checked}
                      onChange={() => toggleRemark(remark.id)}
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor={`remark-${remark.id}`}
                      style={{ cursor: "pointer" }}
                    >
                      {remark.remarkPoint}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemarksBuilderPage;
