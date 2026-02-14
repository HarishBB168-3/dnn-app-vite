import React, { useState } from "react";
import NNListItemActions from "./NNListItemActions";
import AccordionHeader from "./AccordionHeader";

function ServiceOrderAccordion({ data, index, showAddressInAccrd }) {
  const accordionId = `accordion-${index}`;
  const headingId = `heading-${index}`;
  const collapseId = `collapse-${index}`;

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
            <AccordionHeader
              data={data}
              index={index}
              showAddressInAccrd={showAddressInAccrd}
            />
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
              <NNListItemActions data={data} />
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
