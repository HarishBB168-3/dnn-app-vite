import React, { useState } from "react";
import { getPoleGPSLink } from "./services/poleService";
import { useNavigate } from "react-router-dom";

function ServiceOrderAccordion({ data, index }) {
  const accordionId = `accordion-${index}`;
  const headingId = `heading-${index}`;
  const collapseId = `collapse-${index}`;

  const [poleLink, setPoleLink] = useState("");
  const navigate = useNavigate();

  const copyToClipboard = (text) => {
    if (navigator.clipboard && text) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard: " + text);
      });
    } else {
      alert("Unable to copy : " + text);
      console.log(navigator);
    }
  };

  const isPACase = () => {
    if (
      data.SOURCE === "Website" ||
      data.SOURCE === "Consumer Walk-in" ||
      data.SOURCE === "Consumer Call" ||
      data.SOURCE === "WhatsApp" ||
      data.SOURCE === "IVR Complaints" ||
      data.SOURCE === "Chatbot" ||
      data.SOURCE === "E-Mail"
    )
      return true;
    else return false;
  };

  const isInternalAnalysisCase = () => {
    if (
      data.SOURCE === "Internal Analysis" ||
      data.SOURCE === "RRG Initiated D/Transfer" ||
      data.SOURCE === "MRG Initiated"
    )
      return true;
    return false;
  };

  return (
    <div className="accordion mb-4" id={accordionId}>
      <div className="accordion-item">
        <h2 className="accordion-header" id={headingId}>
          <button
            className="accordion-button collapsed text-start"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-expanded="false"
            aria-controls={collapseId}
            style={{
              background: isPACase()
                ? "#eae2b7"
                : isInternalAnalysisCase()
                ? "inherit"
                : "#ffc8dd",
            }}
          >
            <div className="container-fluid">
              <strong>{index}</strong>
              <div className="row">
                <div className="col-md-4">
                  <strong>Type:</strong> {data.NOTIF_TYPE_DESC || "N/A"}
                  <br />
                  <strong>Priority Type:</strong>{" "}
                  {data.NOTIF_PRIORITY_DESC || "N/A"}
                  <br />
                  <strong>Name:</strong> {data.NAME || "N/A"}
                  <br />
                  <strong>Notif #:</strong> {data.NOTIFICATION_NO || "N/A"}
                  <br />
                </div>
                <div className="col-md-4">
                  <strong>Date:</strong> {data.NOTIFICATION_DATE || "N/A"}
                  <br />
                  <strong>Source:</strong> {data.SOURCE || "N/A"}
                  <br />
                  <strong>WS No:</strong> {data.WS_NO || "N/A"}
                </div>
                <div className="col-md-4">
                  <strong>SRV Ord No:</strong> {data.SRV_ORD_NO || "N/A"}
                  <br />
                  <strong>Zone:</strong> {data.ZONECODE || "N/A"}
                  <br />
                  <strong>CA No:</strong> {data.CA_NO || "N/A"}
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-4">
                  <strong>Installation No:</strong>{" "}
                  {data.INSTALLATION_NO || "N/A"}
                  <br />
                  <strong>Phone:</strong> {data.PHN_NO || "N/A"}
                  <br />
                  <strong>Pole:</strong> {data.POLE || "N/A"}
                </div>
                <div className="col-md-4">
                  <strong>Sanctioned Load:</strong>{" "}
                  {data.SANCTION_LOAD || "N/A"}
                  <br />
                  <strong>New Load:</strong> {data.NEW_LOAD_KW || "N/A"}
                  <br />
                  <strong>Rate Catg:</strong> {data.RATE_CATG || "N/A"}
                </div>
                <div className="col-md-4">
                  <strong>Service Ord Date:</strong>{" "}
                  {data.SERVICE_ORD_DATE || "N/A"}
                  <br />
                  <strong>Inserted On:</strong> {data.insertedon || "N/A"}
                  <br />
                  <strong>Old Meter No:</strong> {data.OLD_METER_NO || "N/A"}
                  <br />
                  <strong>Class:</strong> {data.OLD_MTR_CONST_CLASS || "N/A"}
                  <br />
                  <strong>New Meter No :</strong> {data.NEW_METER_NO || "N/A"}
                  <br />
                  <strong>New Class:</strong>{" "}
                  {data.NEW_MTR_CONST_CLASS || "N/A"}
                  <br />
                  <strong>Connection Through :</strong>{" "}
                  {data.CONNECTION_THROUGH || "N/A"}
                  <br />
                </div>
              </div>
            </div>
          </button>
        </h2>

        <div
          id={collapseId}
          className="accordion-collapse collapse"
          aria-labelledby={headingId}
          data-bs-parent={`#${accordionId}`}
        >
          <div className="accordion-body">
            <div className="row">
              <div className="cod-md-6 mb-2">
                <a
                  href={
                    "https://api.tatapower-ddl.com/cmg2/main_forms/frmSVRGenerate.aspx?Name=" +
                    data.NOTIFICATION_NO
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CMG Link
                </a>
                <br />
                <strong>Notif #:</strong> {data.NOTIFICATION_NO || "N/A"}
                {data.NOTIFICATION_NO && (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={(e) => {
                      copyToClipboard(data.NOTIFICATION_NO);
                    }}
                  >
                    Copy
                  </button>
                )}
                <br />
                <strong>Pole:</strong> {data.POLE || "N/A"}
                {data.POLE && (
                  <>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={(e) => {
                        copyToClipboard(data.POLE);
                      }}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-success ms-2"
                      onClick={(e) => {
                        const getPoleLink = async () => {
                          const link = await getPoleGPSLink(data.POLE);
                          console.log("Pole link : ", link);
                          setPoleLink(link);
                        };
                        getPoleLink();
                      }}
                    >
                      Get Link
                    </button>
                    <br />
                    <a
                      href={poleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {poleLink}
                    </a>
                    <br />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={(e) => {
                        navigate("/poleAdvSearch?poleNo=" + data.POLE);
                      }}
                    >
                      Treat Link
                    </button>
                  </>
                )}
                <br />
                <button
                  type="button"
                  className="btn btn-sm btn-secondary "
                  onClick={(e) => {
                    window.open(
                      "/notepad?nn=" + data.NOTIFICATION_NO,
                      "_blank"
                    );
                  }}
                >
                  Notepad History
                </button>
              </div>
              {Object.entries(data).map(([key, value]) => (
                <div className="col-md-6 mb-2" key={key}>
                  <div className="border rounded p-2 bg-light">
                    <strong>{key.replace(/_/g, " ")}:</strong>
                    <br />
                    <span>{value || <em className="text-muted">N/A</em>}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceOrderAccordion;
