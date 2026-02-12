import { useState } from "react";
import { downloadCSV } from "../../components/services/utilsService";
import QuerySection from "./components/QuerySection";
import FilterSection from "./components/FilterSection";
import ServiceOrderAccordion from "./components/ServiceOrderAccordion";
import useNNListData from "./hooks/useNNListData";

const NNListPage = () => {
  const [userId, setUserId] = useState("");
  const {
    loading,
    filterOptions,
    setFilterOptions,
    showAddressInAccrd,
    setShowAddressInAccrd,
    uniqueNNTypeList,
    uniqueZoneList,
    getNNList,
    listToUse,
  } = useNNListData({ userId });

  return (
    <div className="container ">
      <QuerySection
        setUserId={setUserId}
        getNNList={getNNList}
        handleDownloadCSV={() => downloadCSV(listToUse)}
      />

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

      <FilterSection
        uniqueNNTypeList={uniqueNNTypeList}
        uniqueZoneList={uniqueZoneList}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
      />

      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <h3>Total NN : {listToUse.length}</h3>

      <ul className="list-group mt-2">
        {listToUse.length === 0 && (
          <li className="list-group-item">Nothing to show</li>
        )}

        {listToUse.map((item, index) => (
          <ServiceOrderAccordion
            key={item.NOTIFICATION_NO}
            data={item}
            index={index}
            showAddressInAccrd={showAddressInAccrd}
          />
        ))}
      </ul>
    </div>
  );
};

export default NNListPage;
