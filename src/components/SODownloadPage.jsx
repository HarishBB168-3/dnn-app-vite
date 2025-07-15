import { useState } from "react";

const SODownloadPage = () => {
  const [so, setSo] = useState();
  const baseLink =
    "https://api.tatapower-ddl.com/mmgportal/main_forms/fromGenerateProtocol_mob.aspx?son=";
  return (
    <div className="container">
      <h2>SO Download</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="so" className="form-label">
            Service Order
          </label>
          <input
            type="number"
            className="form-control"
            id="so"
            aria-describedby="nnHelp"
            value={so}
            onChange={(e) => setSo(e.target.value)}
          />
          <div id="nnHelp" className="form-text">
            Enter service order no.
          </div>
        </div>
      </form>
      <div>
        <a href={baseLink + so} target="_blank" rel="noopener noreferrer">
          {baseLink + so}
        </a>
      </div>
    </div>
  );
};

export default SODownloadPage;
