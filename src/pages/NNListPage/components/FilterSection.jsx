const FilterSection = ({
  uniqueNNTypeList,
  uniqueZoneList,
  filterOptions,
  setFilterOptions,
}) => {
  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="showExtraData"
          checked={filterOptions.showExtraData}
          onChange={(e) =>
            setFilterOptions((prev) => ({
              ...prev,
              showExtraData: e.target.checked,
            }))
          }
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
          checked={filterOptions.sortByIssueDate}
          onChange={(e) =>
            setFilterOptions((prev) => ({
              ...prev,
              sortByIssueDate: e.target.checked,
            }))
          }
        />
        <label className="form-check-label" htmlFor="sortIssueDate">
          Sort by Issue Date
        </label>
      </div>

      {filterOptions.showExtraData && (
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
              onChange={(e) =>
                setFilterOptions((prev) => ({
                  ...prev,
                  filterType: "",
                }))
              }
              checked={"" === filterOptions.filterType}
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
                onChange={(e) =>
                  setFilterOptions((prev) => ({
                    ...prev,
                    filterType: nnType,
                  }))
                }
                checked={nnType === filterOptions.filterType}
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
