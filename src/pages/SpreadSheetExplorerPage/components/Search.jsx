import { useEffect, useState } from "react";
import { initDB } from "../db";

export default function Search({ databases }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSufficeintData = () => {
    if (query && databases.length) return true;
    return false;
  };

  useEffect(() => {
    loadHeaders();
  }, [databases]);

  const loadHeaders = async () => {
    if (databases.length === 0) return;

    const headersList = await Promise.all(
      databases.map(async (dbItem) => {
        const db = await initDB(dbItem.db.name);
        const tx = db.transaction("meta", "readonly");
        const hd = await tx.objectStore("meta").get("headers");
        return hd || [];
      })
    );
    setHeaders(headersList);
  };

  const search = async () => {
    if (databases.length === 0) return;
    if (!query) return;

    setLoading(true);

    const resultsList = await Promise.all(
      databases.map(async (dbItem) => {
        const db = await initDB(dbItem.db.name);
        const tx = db.transaction("rows", "readonly");
        const store = tx.objectStore("rows");
        const allRows = await store.getAll();
        const filtered = allRows.filter((row) =>
          Object.values(row).some((value) =>
            String(value).toLowerCase().includes(query.toLowerCase())
          )
        );
        return filtered.slice(0, 50);
      })
    );

    setResults(resultsList);
    setLoading(false);
  };

  return (
    <div className="mt-4">
      {/* Search Input */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-primary"
          disabled={!isSufficeintData()}
          onClick={search}
        >
          Search
        </button>
      </div>

      {loading && <div className="alert alert-info">Searching...</div>}

      {/* Results Table */}
      {results.length > 0 &&
        results.length === headers.length &&
        results.map((mResult, idx) => (
          <div className="table-responsive" key={idx}>
            <table className="table table-bordered table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  {headers[idx].map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mResult.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers[idx].map((header, colIndex) => (
                      <td key={colIndex}>{row[header]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

      {results.length === 0 && !loading && (
        <div className="text-muted">No results yet.</div>
      )}
    </div>
  );
}
