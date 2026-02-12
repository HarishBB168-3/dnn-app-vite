const FilterSection = ({
  showExtraData,
  setShowExtraData,
  sortByIssueDate,
  setSortByIssueDate,
  showAddressInAccrd,
  setShowAddressInAccrd,
  uniqueNNTypeList,
  uniqueZoneList,
  filterType,
  setFilterType,
}) => {
  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="showExtraData"
          checked={showExtraData}
          onChange={(e) => setShowExtraData(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="showExtraData">
          Show Extra Data
        </label>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="sortIssueDate"
          checked={sortByIssueDate}
          onChange={(e) => setSortByIssueDate(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="sortIssueDate">
          Sort by Issue Date
        </label>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="showAddress"
          checked={showAddressInAccrd}
          onChange={(e) => setShowAddressInAccrd(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="showAddress">
          Show Address
        </label>
      </div>

      {showExtraData && (
        <div className="d-flex">
          <ul className="list-group">
            {[...uniqueNNTypeList].map(([nnType, count]) => (
              <li key={nnType} className="list-group-item">
                {nnType} <span className="badge text-bg-warning">{count}</span>
              </li>
            ))}
          </ul>
          <ul className="list-group">
            {[...uniqueZoneList].map(([zoneNo, count]) => (
              <li key={zoneNo} className="list-group-item">
                {zoneNo} <span className="badge text-bg-warning">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="d-flex gap-2 row">
        <div className="form-check col">
          <label className="form-check-label w-100 h-100" htmlFor="all">
            <input
              className="form-check-input"
              type="radio"
              name="filterType"
              id="all"
              onChange={() => setFilterType("")}
              checked={"" === filterType}
            />
            All
          </label>
        </div>
        {[...uniqueNNTypeList].map(([nnType, count]) => (
          <div className="form-check col" key={nnType}>
            <label className="form-check-label w-100 h-100" htmlFor={nnType}>
              <input
                className="form-check-input"
                type="radio"
                name="filterType"
                id={nnType}
                onChange={() => setFilterType(nnType)}
                checked={nnType === filterType}
              />
              {nnType}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterSection;
