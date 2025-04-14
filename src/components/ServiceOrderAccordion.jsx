function ServiceOrderAccordion({ data, index }) {
  const accordionId = `accordion-${index}`;
  const headingId = `heading-${index}`;
  const collapseId = `collapse-${index}`;

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
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4">
                  <strong>Type:</strong> {data.NOTIF_TYPE_DESC || "N/A"}
                  <br />
                  <strong>Name:</strong> {data.NAME || "N/A"}
                  <br />
                  <strong>Notif #:</strong> {data.NOTIFICATION_NO || "N/A"}
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
