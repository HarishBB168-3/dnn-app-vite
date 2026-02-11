import { copyToClipboard } from "../../../components/services/utilsService";

const Collapsable = ({
  settingsUrl,
  setSettingsUrl,
  getDataFromUrl,
  reportData,
  handleReportDataChange,
}) => {
  return (
    <div className="row">
      <h4>Report</h4>

      <div className="input-group mb-3">
        <span className="input-group-text" id="settings">
          Settings Source Url
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Settings Source Url"
          aria-label="Settings Source Url"
          aria-describedby="settings"
          id="settings"
          value={settingsUrl}
          onChange={(e) => setSettingsUrl(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            getDataFromUrl(settingsUrl);
          }}
        >
          Load Settings
        </button>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text" id="lastLineLabel">
          Last line
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Last line"
          aria-label="Last line"
          aria-describedby="lastLineLabel"
          id="lastLine"
          value={reportData.lastLine}
          onChange={(e) => handleReportDataChange("lastLine", e.target.value)}
        />
      </div>

      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="holdCountSelect">
          Hold Count
        </label>
        <select
          className="form-select"
          id="holdCountSelect"
          value={reportData.holdCount}
          onChange={(e) => handleReportDataChange("holdCount", e.target.value)}
        >
          {Array.from({ length: 21 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>

      <div className="col-auto align-self-start">
        <button
          type="submit"
          className="btn btn-sm btn-primary"
          onClick={(e) => {
            e.preventDefault();
            copyToClipboard(reportData.finalText);
          }}
        >
          Copy Report
        </button>
        <button
          type="submit"
          className="btn mx-2 btn-sm btn-info"
          onClick={(e) => {
            e.preventDefault();
            handleReportDataChange("finalText", "");
          }}
        >
          <i className="bi bi-arrows-collapse"></i>
        </button>
      </div>

      <textarea
        className="form-control"
        name=""
        id=""
        rows="15"
        value={reportData.finalText}
        readOnly
      />
    </div>
  );
};

export default Collapsable;
