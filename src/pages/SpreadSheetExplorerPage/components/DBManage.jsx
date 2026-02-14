import { useEffect, useState } from "react";
import DBManageUpload from "./DBManageUpload";
import { loadDatabases } from "../db";

export default function DBManage() {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleLoadDatabase();
  }, []);

  const handleLoadDatabase = async () => {
    setLoading(true);
    const detailedList = await loadDatabases();
    setDatabases(detailedList);
    setLoading(false);
  };

  const deleteDatabase = async (name) => {
    await indexedDB.deleteDatabase(name);
    handleLoadDatabase();
  };

  return (
    <div className="card card-body border">
      <h5 className="mb-3">Databases</h5>

      {/* Adding a new database */}
      <DBManageUpload refreshDbList={handleLoadDatabase} />

      {loading && <div className="alert alert-info">Loading...</div>}

      {!loading && databases.length === 0 && (
        <div className="alert alert-warning">No IndexedDB databases found.</div>
      )}

      {!loading &&
        databases.map((db, index) => (
          <div key={index} className="card mb-3 shadow-sm">
            <div className="card-body p-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <h5 className="card-title">{db.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted mx-2">
                    Ver: {db.version} | Obj Stores :
                    {db.stores.map((store, i) => (
                      <span key={i} className="badge text-bg-primary mx-1">
                        {store.storeName} {store.rowCount}
                      </span>
                    ))}
                  </h6>
                </div>

                <div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteDatabase(db.name)}
                  >
                    Delete DB
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

      <button className="btn btn-primary mt-3" onClick={handleLoadDatabase}>
        Refresh
      </button>
    </div>
  );
}
