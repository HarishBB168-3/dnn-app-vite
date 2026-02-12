import { copyToClipboard } from "../../../components/services/utilsService";
import { statusToBgClass } from "../constants";

const urlProtocol =
  "https://api.tatapower-ddl.com/mmgportal/main_forms/fromGenerateProtocol_mob.aspx?son=";

const Card = ({
  item,
  index: idx,
  mtrTypeList,
  workTypeList,
  caseReportList,
  handleSelectMtrType,
  handleSelectWorkType,
  handleSelectCableLength,
  handleSelectBusbarInst,
}) => {
  return (
    <div className="col-md-4 mb-4">
      <div
        className={`card h-100 ${
          statusToBgClass[item.Hold_Cancel_type] || statusToBgClass.default
        }`}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{item.NOTIFICATION_NO}</h5>
            <a
              className="rounded bg-warning p-2"
              href={urlProtocol + item.SRV_ORD_NO}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.SRV_ORD_NO}
            </a>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <span className="card-text">{item.Hold_Cancel_type}</span>
            <span className="card-text">{item.insertedon}</span>
          </div>

          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="mtrType">
              Mtr Type
            </label>
            <select
              className="form-select"
              id="mtrType"
              value={caseReportList[idx].mtrType}
              onChange={(e) => handleSelectMtrType(e.target.value, idx)}
            >
              <option value="">-- Select Mtr Type --</option>
              {mtrTypeList.map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="workType">
              Work Type
            </label>
            <select
              className="form-select"
              id="workType"
              value={caseReportList[idx].workType}
              onChange={(e) => handleSelectWorkType(e.target.value, idx)}
            >
              <option value="">-- Select Work Type --</option>
              {workTypeList.map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Cable length"
              aria-label="Username"
              value={item.cableLength}
              onChange={(e) => handleSelectCableLength(e.target.value, idx)}
            />
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id={`${idx}_busbarInst`}
              checkked={item.busbarInst}
              onChange={(e) => handleSelectBusbarInst(e.target.checked, idx)}
            />
            <label className="form-check-label" htmlFor={`${idx}_busbarInst`}>
              Busbar
            </label>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-primary btn-sm"
            onClick={(e) => {
              window.open("/notepad?nn=" + item.NOTIFICATION_NO, "_blank");
            }}
          >
            Notepad
          </button>
          <button
            className="btn btn-info btn-sm ms-2 rounded"
            onClick={(e) => {
              copyToClipboard(item.NOTIFICATION_NO.slice(2));
            }}
          >
            Copy NN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
