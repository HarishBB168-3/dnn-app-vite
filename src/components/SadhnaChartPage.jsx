import { useState } from "react";
import { copyToClipboard } from "./services/utilsService";

const SadhnaChartPage = () => {
  const [data, setData] = useState({
    name: "",
    date: "",
    b4ma: "",
    till7: "",
    totalRound: "",
    lastRound: "",
    reading: "",
    hearing: "",
    sleptLN: "",
    wakeUp: "",
    dayRest: "",
  });
  const [report, setReport] = useState("");

  const updateData = (id, value) => {
    const newData = { ...data };
    newData[id] = value;
    setData(newData);
  };

  const formatDate = (input) => {
    const parts = input.split("-");
    if (parts.length !== 3) return "Invalid date";

    const [yyyy, mm, dd] = parts;
    if (!yyyy || !mm || !dd) return "Invalid date";

    return `${dd.padStart(2, "0")}/${mm.padStart(2, "0")}/${yyyy}`;
  };

  const prepareReport = () => {
    const newReport = `Hare Krishna Prabhu Ji
Pamho
Date : ${formatDate(data.date)}
Chant B4 MA : ${data.b4ma}
Till 7:00am : ${data.till7}
Total Round : ${data.totalRound}
Last Round : ${data.lastRound}
Reading : ${data.reading}min
Hearing : ${data.hearing}min
Slept at last night : ${data.sleptLN}
Wake up : ${data.wakeUp}
Day Rest : ${data.dayRest}min

Your fallen servant
${data.name}`;

    return newReport;
  };

  const copyReport = () => {
    copyToClipboard(report);
  };

  return (
    <div>
      <h3>Sadhna Chart</h3>

      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={data.name}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="dateSpan">
            Date
          </span>
          <input
            id="date"
            type="date"
            class="form-control"
            aria-label="Date"
            aria-describedby="dateSpan"
            value={data.date}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Chant B4 MA</span>
          <input
            id="b4ma"
            type="number"
            class="form-control"
            aria-label="Chant B4 MA"
            aria-describedby="b4ma"
            value={data.b4ma}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="till7">
            Till 7:00am
          </span>
          <input
            id="till7"
            type="number"
            class="form-control"
            aria-label="Till 7am"
            aria-describedby="till7"
            value={data.till7}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="totalRoundSpan">
            Total Round
          </span>
          <input
            id="totalRound"
            type="number"
            class="form-control"
            aria-label="totalRound"
            aria-describedby="totalRoundSpan"
            value={data.totalRound}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="lastRoundSpan">
            Last Round
          </span>
          <input
            id="lastRound"
            type="time"
            class="form-control"
            aria-label="Last Round"
            aria-describedby="lastRoundSpan"
            value={data.lastRound}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="readingSpan">
            Reading
          </span>
          <input
            id="reading"
            type="number"
            class="form-control"
            aria-label="Reading"
            aria-describedby="readingSpan"
            value={data.reading}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
          <span className="input-group-text">min</span>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="hearingSpan">
            Hearing
          </span>
          <input
            id="hearing"
            type="number"
            class="form-control"
            aria-label="Hearing"
            aria-describedby="hearingSpan"
            value={data.hearing}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
          <span className="input-group-text">min</span>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="sleptLNSpan">
            Slept at last night
          </span>
          <input
            id="sleptLN"
            type="time"
            class="form-control"
            aria-label="Slept at last night"
            aria-describedby="sleptLNSpan"
            value={data.sleptLN}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="wakeUpSpan">
            Wake up
          </span>
          <input
            id="wakeUp"
            type="time"
            class="form-control"
            aria-label="Wakeup"
            aria-describedby="wakeUpSpan"
            value={data.wakeUp}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="dayRestSpan">
            Day Rest
          </span>
          <input
            id="dayRest"
            type="number"
            class="form-control"
            aria-label="dayRest"
            aria-describedby="dayRestSpan"
            value={data.dayRest}
            onChange={(e) => {
              updateData(e.target.id, e.target.value);
            }}
          />
          <span className="input-group-text">min</span>
        </div>

        <button
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            const newReport = prepareReport();
            setReport(newReport);
          }}
        >
          Prepare Report
        </button>
      </form>

      <div className="row">
        <div className="col-auto align-self-start my-1">
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            onClick={(e) => {
              e.preventDefault();
              copyReport();
            }}
          >
            Copy Report
          </button>
        </div>
        <h4>Report</h4>
        <textarea
          className="form-control"
          name=""
          id=""
          rows="15"
          value={report}
          readOnly
        />
        <div className="col-auto align-self-start">
          <button
            type="submit"
            className="btn btn-sm btn-primary"
            onClick={(e) => {
              e.preventDefault();
              copyReport();
            }}
          >
            Copy Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SadhnaChartPage;
