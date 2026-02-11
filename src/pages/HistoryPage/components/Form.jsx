const Form = ({ userId, handleUserIdChange, handleSubmit, prepareReport }) => {
  return (
    <form>
      <div className="input-group mb-3">
        <span className="input-group-text" id="labelUserID">
          User Id
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="User Id"
          aria-label="User Id"
          aria-describedby="labelUserID"
          id="userId"
          value={userId}
          onChange={(e) => handleUserIdChange(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Submit
      </button>
      <br />
      <button
        type="submit"
        className="btn btn-sm btn-info my-2"
        onClick={(e) => {
          e.preventDefault();
          prepareReport();
        }}
      >
        Prepare Report
      </button>
    </form>
  );
};

export default Form;
