import { useCallback, useState } from "react";
import { getPoleLatLong } from "../../components/services/poleService";
import { openInNewTab } from "../../components/services/utilsService";

const baseUrl = "https://www.google.com/maps/dir/";

const PoleRoutePage = () => {
  const [poleListText, setPoleListText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [poleWithNoLocations, setPoleWithNoLocations] = useState([]);
  const [validLocations, setValidLocations] = useState([]);

  const openInNewTabCallback = useCallback(openInNewTab);

  const createRouteLink = async () => {
    try {
      setLoading(true);
      if (!poleListText?.trim()) {
        setResult("");
        return;
      }

      // Split, trim, and remove empty lines first
      const poles = poleListText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      if (poles.length === 0) {
        setResult("");
        return;
      }

      // Fetch coordinates
      const locations = await Promise.all(
        poles.map((pole) => getPoleLatLong(pole))
      );

      // Remove invalid results
      const noLocationPoles = [];
      const mValidLocations = locations.filter((location, idx) => {
        if (location !== "") return true;
        else {
          noLocationPoles.push(poles[idx]);
          return false;
        }
      });
      setValidLocations(mValidLocations);
      setPoleWithNoLocations(noLocationPoles);

      if (mValidLocations.length === 0) {
        setResult("");
        return;
      }

      const url = `${baseUrl}${mValidLocations.join("/")}`;
      setResult(url);
    } catch (error) {
      console.error("Error creating route link:", error);
      setResult("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="poleList" className="form-label">
            Pole List
          </label>

          <div className="input-group">
            <textarea
              id="poleList"
              className="form-control"
              placeholder="Pole list..."
              rows="8"
              value={poleListText}
              onChange={(e) => setPoleListText(e.target.value)}
            ></textarea>
          </div>
          <div id="nnHelp" className="form-text">
            Enter pole no. list
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
          onClick={(e) => {
            e.preventDefault();
            createRouteLink();
          }}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      <div className="container d-flex flex-column">
        {!result && <span>No link</span>}
        {result && (
          <a
            className="text-break"
            href={result}
            target="_blank"
            rel="noopener noreferrer"
          >
            {result}
          </a>
        )}
        {validLocations.length > 0 && (
          <div>
            <button
              colorClass="btn-dark"
              className="btn btn-sm btn-success"
              onClick={() =>
                openInNewTabCallback(
                  `/map?locations=${validLocations.join("/")}`
                )
              }
            >
              Custom Map
            </button>
          </div>
        )}
        {poleWithNoLocations.length > 0 && (
          <>
            <h5>Pole with No Locations</h5>
            <ul className="list-group mb-4">
              {poleWithNoLocations.map((item, idx) => (
                <li key={idx} className="list-group-item">
                  {item}
                  <button
                    className="btn btn-sm btn-success ms-2"
                    onClick={() =>
                      openInNewTabCallback(`/poleAdvSearch?poleNo=${item}`)
                    }
                  >
                    Treat Link
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default PoleRoutePage;
