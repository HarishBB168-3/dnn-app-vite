import React from "react";

const Value = ({ label, value }) => (
  <>
    <strong>{label}:</strong> {value || "N/A"}
    <br />
  </>
);

const HighlightBlock = ({ label, value }) => {
  if (!value) return <Value label={label} value={value} />;

  return (
    <div className="p-3 mb-2 bg-warning text-dark">
      <strong>{label}:</strong> {value}
    </div>
  );
};

const AccordionHeader = ({ data = {}, index, showAddressInAccrd }) => {
  const {
    NOTIF_TYPE_DESC,
    NOTIF_PRIORITY_DESC,
    NAME,
    NOTIFICATION_NO,
    NOTIFICATION_DATE,
    SOURCE,
    WS_NO,
    SRV_ORD_NO,
    ZONECODE,
    CA_NO,
    INSTALLATION_NO,
    PHN_NO,
    POLE,
    SANCTION_LOAD,
    NEW_LOAD_KW,
    RATE_CATG,
    SERVICE_ORD_DATE,
    insertedon,
    OLD_METER_NO,
    OLD_MTR_CONST_CLASS,
    NEW_METER_NO,
    NEW_MTR_CONST_CLASS,
    NEW_CTPT_RATIO,
    CONNECTION_THROUGH,
    ADVICE_OLD_METER,
    APPOINTMNT_DATE,
    VAN_NO,
    ADDRESS,
  } = data;

  return (
    <div className="container-fluid">
      <strong>{index + 1}</strong>

      {/* Row 1 */}
      <div className="row">
        <div className="col-md-4">
          <Value label="Type" value={NOTIF_TYPE_DESC} />
          <Value label="Priority Type" value={NOTIF_PRIORITY_DESC} />
          <Value label="Name" value={NAME} />
          <Value label="Notif #" value={NOTIFICATION_NO} />
        </div>

        <div className="col-md-4">
          <Value label="Date" value={NOTIFICATION_DATE} />
          <Value label="Source" value={SOURCE} />
          <Value label="WS No" value={WS_NO} />
        </div>

        <div className="col-md-4">
          <Value label="SRV Ord No" value={SRV_ORD_NO} />
          <Value label="Zone" value={ZONECODE} />
          <Value label="CA No" value={CA_NO} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="row mt-2">
        <div className="col-md-4">
          <Value label="Installation No" value={INSTALLATION_NO} />
          <Value label="Phone" value={PHN_NO} />
          <Value label="Pole" value={POLE} />
        </div>

        <div className="col-md-4">
          <Value label="Sanctioned Load" value={SANCTION_LOAD} />
          <Value label="New Load" value={NEW_LOAD_KW} />
          <Value label="Rate Catg" value={RATE_CATG} />
        </div>

        <div className="col-md-4">
          <Value label="Service Ord Date" value={SERVICE_ORD_DATE} />
          <Value label="Inserted On" value={insertedon} />
          <Value label="Old Meter No" value={OLD_METER_NO} />
          <Value label="Class" value={OLD_MTR_CONST_CLASS} />
          <Value label="New Meter No" value={NEW_METER_NO} />
          <Value label="New Class" value={NEW_MTR_CONST_CLASS} />
          <Value label="NEW CTPT RATIO" value={NEW_CTPT_RATIO} />
          <Value label="Connection Through" value={CONNECTION_THROUGH} />

          <HighlightBlock
            label="Advice for old meter"
            value={ADVICE_OLD_METER}
          />

          <HighlightBlock label="Appointment Date" value={APPOINTMNT_DATE} />

          <Value label="Van No" value={VAN_NO} />

          {showAddressInAccrd && <Value label="Address" value={ADDRESS} />}

          {/* Hidden Address for search indexing (if required) */}
          <div
            style={{
              width: 1,
              height: 1,
              overflow: "hidden",
              fontSize: 1,
            }}
          >
            {ADDRESS}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AccordionHeader);
