import { useEffect, useMemo, useState } from "react";
import http from "../../components/services/httpService";
import {
  downloadCSV,
  getUniqueValuesNCountByKey,
} from "../../components/services/utilsService";
import { filterList, sortByDate, sortByPoleSuffix } from "./utils";
import QuerySection from "./components/QuerySection";
import FilterSection from "./components/FilterSection";
import ServiceOrderAccordion from "./components/ServiceOrderAccordion";
import { fetchNNList } from "./services/nnListPageService";

const NNListPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nnList, setNnList] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [uniqueNNTypeList, setNNTypeList] = useState([]);
  const [uniqueZoneList, setZoneList] = useState([]);
  const [showExtraData, setShowExtraData] = useState(false);
  const [sortByIssueDate, setSortByIssueDate] = useState(false);
  const [showAddressInAccrd, setShowAddressInAccrd] = useState(false);

  useEffect(() => {
    setNNTypeList(getUniqueValuesNCountByKey(nnList, "NOTIF_TYPE_DESC"));
    setZoneList(getUniqueValuesNCountByKey(nnList, "ZONECODE"));
  }, []);

  const mFilteredList = useMemo(() => {
    const result = filterList(nnList, "NOTIF_TYPE_DESC", filterType);
    return result;
  }, [nnList, filterType]);

  const clearData = () => {
    setNnList([]);
    setFilterType("");
    setNNTypeList([]);
    setZoneList([]);
  };

  const getNNList = async () => {
    clearData();
    setIsLoading(true);
    try {
      const data = await fetchNNList(userId);
      console.log(data);
      const sortedData = sortByPoleSuffix(data);
      setNnList(sortedData);
      setNNTypeList(getUniqueValuesNCountByKey(sortedData, "NOTIF_TYPE_DESC"));
      setZoneList(getUniqueValuesNCountByKey(sortedData, "ZONECODE"));
    } catch (e) {}
    setIsLoading(false);
  };

  let listToUse = mFilteredList.length === 0 ? nnList : mFilteredList;

  if (sortByIssueDate) {
    listToUse = sortByDate(listToUse, "SERVICE_ORD_DATE", "desc");
    console.log("Sorting by date in desc");
  }

  return (
    <div className="container ">
      <QuerySection
        setUserId={setUserId}
        getNNList={getNNList}
        handleDownloadCSV={() => downloadCSV(listToUse)}
      />

      <FilterSection
        showExtraData={showExtraData}
        setShowExtraData={setShowExtraData}
        sortByIssueDate={sortByIssueDate}
        setSortByIssueDate={setSortByIssueDate}
        showAddressInAccrd={showAddressInAccrd}
        setShowAddressInAccrd={setShowAddressInAccrd}
        uniqueNNTypeList={uniqueNNTypeList}
        uniqueZoneList={uniqueZoneList}
        filterType={filterType}
        setFilterType={setFilterType}
      />

      {isLoading && (
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
