import React, { useState } from "react";

// Helper to format today's date as yyyy.mm.dd_
const getTodayPrefix = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}_`;
};

function RenamePdfPage() {
  const [prefix, setPrefix] = useState(getTodayPrefix());
  const [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    const pdfFiles = uploadedFiles
      .filter((file) => file.type === "application/pdf")
      .map((file) => ({
        name: file.name,
        blobUrl: URL.createObjectURL(file),
      }));

    setFiles((prev) => [...prev, ...pdfFiles]);
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Upload & Rename PDF Files</h3>

      {/* Prefix input */}
      <div className="mb-3">
        <label className="form-label fw-semibold">File name prefix</label>
        <input
          type="text"
          className="form-control"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
          placeholder="Enter file prefix"
        />
      </div>

      {/* File upload */}
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          multiple
          onChange={handleFileUpload}
        />
      </div>

      {/* Download list */}
      {files.length > 0 && (
        <>
          <h5 className="mt-4">Download Files</h5>
          <ul className="list-group mt-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {prefix}
                  {file.name}
                </span>
                <a
                  href={file.blobUrl}
                  download={`${prefix}${file.name}`}
                  className="btn btn-sm btn-primary"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default RenamePdfPage;
