const QuerySection = ({ setUserId, getNNList, handleDownloadCSV }) => {
  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User Id
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            getNNList();
          }}
        >
          Submit
        </button>
      </form>

      <button className="btn btn-info btn-sm my-3" onClick={handleDownloadCSV}>
        Download as CSV
      </button>
    </>
  );
};

export default QuerySection;
