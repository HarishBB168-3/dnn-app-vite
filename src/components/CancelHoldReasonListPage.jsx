import React, { useEffect, useState } from "react";

const CancelHoldReasonListPage = () => {
  const [jsonData, setJsonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "https://api.tatapower-ddl.com/mmg2/Getcancelreason";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then((rawText) => {
        try {
          // Remove unnecessary backslashes around quotes
          const cleaned = rawText
            .replace(/\\"/g, '"')
            .replace(/"\[/, "[")
            .replace(/\]"/, "]");
          const parsed = JSON.parse(cleaned);
          setJsonData(parsed);
        } catch (parseErr) {
          console.error("Parsing error:", parseErr);
          setError("Failed to parse API response");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger">Failed to load data: {error}</div>
      </div>
    );
  }

  if (jsonData.length === 0) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-warning">No data available from API</div>
      </div>
    );
  }

  const columns = Object.keys(jsonData[0]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Cancel Reason Codes</h1>

      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              {columns.map((col) => (
                <th key={col}>{col.replace(/_/g, " ")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jsonData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col}>
                    {row[col] && row[col] !== "" ? (
                      row[col]
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CancelHoldReasonListPage;
