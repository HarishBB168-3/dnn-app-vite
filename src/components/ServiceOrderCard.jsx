function ServiceOrderCard({ data }) {
  return (
    <div className="container my-4">
      <div className="card shadow border-primary">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Service Order: {data.SRV_ORD_NO}</h5>
        </div>

        <div className="card-body">
          {/* Customer Info */}
          <h6 className="text-secondary">Customer Information</h6>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Name:</strong> {data.NAME}
            </li>
            <li className="list-group-item">
              <strong>CA No:</strong> {data.CA_NO}
            </li>
            <li className="list-group-item">
              <strong>Phone:</strong> {data.PHN_NO}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {data.EMAIL}
            </li>
            <li className="list-group-item">
              <strong>Address:</strong> {data.ADDRESS}
            </li>
          </ul>

          {/* Service Info */}
          <h6 className="text-secondary">Service Details</h6>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Form Type:</strong> {data.FORM_TYPE}
            </li>
            <li className="list-group-item">
              <strong>Installation No:</strong> {data.INSTALLATION_NO}
            </li>
            <li className="list-group-item">
              <strong>Service Order Date:</strong> {data.SERVICE_ORD_DATE}
            </li>
            <li className="list-group-item">
              <strong>Appointment Date:</strong> {data.APPOINTMNT_DATE || "N/A"}
            </li>
            <li className="list-group-item">
              <strong>Connection Status:</strong> {data.CONNECTION_STATUS}
            </li>
            <li className="list-group-item">
              <strong>Billing Class:</strong> {data.BILLING_CLASS}
            </li>
            <li className="list-group-item">
              <strong>Rate Category:</strong> {data.RATE_CATG}
            </li>
          </ul>

          {/* Meter Info */}
          <h6 className="text-secondary">Old Meter Details</h6>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Old Meter No:</strong> {data.OLD_METER_NO}
            </li>
            <li className="list-group-item">
              <strong>Const Class:</strong> {data.OLD_MTR_CONST_CLASS}
            </li>
            <li className="list-group-item">
              <strong>Make:</strong> {data.OLD_MTR_MAKE}
            </li>
            <li className="list-group-item">
              <strong>MF:</strong> {data.OLD_MTR_MF}
            </li>
            <li className="list-group-item">
              <strong>Location:</strong> {data.OLD_MTR_LOCATION}
            </li>
          </ul>

          {/* Notification Info */}
          <h6 className="text-secondary">Notification</h6>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Notification No:</strong> {data.NOTIFICATION_NO}
            </li>
            <li className="list-group-item">
              <strong>Type:</strong> {data.NOTIF_TYPE_DESC}
            </li>
            <li className="list-group-item">
              <strong>Priority:</strong> {data.NOTIF_PRIORITY_DESC}
            </li>
            <li className="list-group-item">
              <strong>Date:</strong> {data.NOTIFICATION_DATE}
            </li>
          </ul>

          {/* Agency Info */}
          <h6 className="text-secondary">Agency & Staff</h6>
          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>Agency:</strong> {data.AGENCY_NAME}
            </li>
            <li className="list-group-item">
              <strong>Staff Code:</strong> {data.AGENCY_STAFF_CODE}
            </li>
            <li className="list-group-item">
              <strong>TPDDL Rep:</strong> {data.TPDDL_REP_NAME}
            </li>
            <li className="list-group-item">
              <strong>TPDDL Emp Code:</strong> {data.TPDDL_EMP_CODE}
            </li>
          </ul>

          {/* Misc Info */}
          <h6 className="text-secondary">Other Info</h6>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Zone:</strong> {data.ZZ_ZONE}
            </li>
            <li className="list-group-item">
              <strong>Pole:</strong> {data.POLE}
            </li>
            <li className="list-group-item">
              <strong>Van No:</strong> {data.VAN_NO}
            </li>
            <li className="list-group-item">
              <strong>Outstanding Energy Bill:</strong> ?
              {data.ENERGY_BILL_OUTSTANDING}
            </li>
            <li className="list-group-item">
              <strong>Date of Disconnection:</strong>{" "}
              {data.DATE_OF_DISCONNECTION}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ServiceOrderCard;
