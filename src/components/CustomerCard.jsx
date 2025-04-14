function CustomerCard({ customer }) {
  return (
    <div className="container my-4">
      <div className="card shadow-sm rounded-3">
        <div className="card-header bg-primary text-white fw-bold">
          Customer Summary
        </div>
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <strong>CA No:</strong>{" "}
              <span className="text-muted">{customer.CA_NO}</span>
            </div>
            <div className="col-md-6">
              <strong>Customer Name:</strong>{" "}
              <span className="text-muted">{customer.CA_NAME}</span>
            </div>
            <div className="col-md-6">
              <strong>Billing Class:</strong>{" "}
              <span className="text-muted">{customer.BILL_CLASS}</span>
            </div>
            <div className="col-md-6">
              <strong>Rate Category:</strong>{" "}
              <span className="text-muted">{customer.RATE_CATEGORY}</span>
            </div>
            <div className="col-md-6">
              <strong>Connection Status:</strong>{" "}
              <span
                className={`fw-semibold ${
                  customer.CONNECTION_STATUS === "Active"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {customer.CONNECTION_STATUS}
              </span>
            </div>
            <div className="col-md-6">
              <strong>Contract Class:</strong>{" "}
              <span className="text-muted">{customer.CONTRACT_CLASS}</span>
            </div>
            <div className="col-md-6">
              <strong>Energy Date:</strong>{" "}
              <span className="text-muted">{customer.ENERGY_DATE}</span>
            </div>
            <div className="col-md-6">
              <strong>Pole No:</strong>{" "}
              <span className="text-muted">{customer.POLE_NO}</span>
            </div>
            <div className="col-12">
              <strong>Supply Address:</strong>
              <div className="text-muted">{customer.SUPPLY_ADD}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCard;
