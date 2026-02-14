import { useState } from "react";
import Papa from "papaparse";
import { initDB, clearDB } from "../db";

const DBManageUpload = ({ refreshDbList }) => {
  const [newDbName, setNewDbName] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  const formatFileName = (fileName) => {
    return (
      fileName
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "") +
      "_" +
      new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace("T", "_")
        .slice(0, 15)
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // First selected file
    if (file) {
      setNewDbName(formatFileName(file.name));
      setFile(file);
    }
  };

  const handleUpload = async (e) => {
    if (!file) {
      alert("No file available");
      return;
    }
    if (!newDbName) {
      alert("New dbName available.");
      return;
    }

    setLoading(true);

    await clearDB(newDbName);
    const db = await initDB(newDbName);

    let rowCount = 0;

    // STEP 1: Read only header row (no worker)
    await new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        preview: 1,
        complete: async (results) => {
          const headers = results.meta.fields;

          const tx = db.transaction("meta", "readwrite");
          await tx.objectStore("meta").put(headers, "headers");
          await tx.done;

          resolve();
        },
      });
    });

    // STEP 2: Parse full file in worker mode
    Papa.parse(file, {
      header: true,
      worker: true,
      skipEmptyLines: true,
      chunkSize: 1024 * 1024, // 1MB

      chunk: async (results) => {
        rowCount += results.data.length;
        const tx = db.transaction("rows", "readwrite");
        const store = tx.objectStore("rows");

        for (const row of results.data) {
          store.add(row);
        }
        await tx.done;
      },

      complete: () => {
        setLoading(false);
        console.log("Parsing done");
        alert(`Finished! ${rowCount} rows stored.`);
        refreshDbList();
        setFile(null);
        setNewDbName("");
      },
    });
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          id="fileToUpload"
          aria-describedby="fileUploadBtn"
          aria-label="Upload"
          accept=".csv"
          onChange={handleFileChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="fileUploadBtn"
          onClick={handleUpload}
          disabled={loading || !file || !newDbName}
        >
          Upload
        </button>
      </div>

      {loading && (
        <div className="alert alert-warning" role="alert">
          <div
            className="spinner-border spinner-border-sm text-primary"
            role="status"
            aria-hidden="true"
          ></div>

          <span className="fw-semibold mx-2">Processing...</span>
        </div>
      )}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Filename"
          aria-label="Filename"
          aria-describedby="basic-addon1"
          value={newDbName}
          onChange={(e) => setNewDbName(e.target.value)}
        />
      </div>
    </>
  );
};

export default DBManageUpload;
