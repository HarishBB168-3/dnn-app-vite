import { useEffect, useState } from "react";
import http from "../../components/services/httpService";
import {
  downloadCSV,
  getUniqueValuesNCountByKey,
} from "../../components/services/utilsService";
import ServiceOrderAccordion from "../../components/ServiceOrderAccordion";
import { filterList, sortByDate, sortByPoleSuffix } from "./utils";
import QuerySection from "./components/QuerySection";
import FilterSection from "./components/FilterSection";

const NNListPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nnList, setNnList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [uniqueNNTypeList, setNNTypeList] = useState([]);
  const [uniqueZoneList, setZoneList] = useState([]);
  const [showExtraData, setShowExtraData] = useState(false);
  const [sortByIssueDate, setSortByIssueDate] = useState(false);
  const [showAddressInAccrd, setShowAddressInAccrd] = useState(false);

  useEffect(() => {
    const data = [...nnList];
    const result = filterList(data, "NOTIF_TYPE_DESC", filterType);
    console.log("Filter result : ", result);
    console.log("Filter type : ", filterType);
    setFilteredList(result);
    setNNTypeList(getUniqueValuesNCountByKey(nnList, "NOTIF_TYPE_DESC"));
    setZoneList(getUniqueValuesNCountByKey(nnList, "ZONECODE"));
  }, [filterType]);

  const url = "https://api.tatapower-ddl.com/mmg2/GetCustomerDetailsMMG";

  const payload = {
    userId: "",
    insertedon: 0,
    APK_VERSION: "CMM_2.3.6",
  };

  const clearData = () => {
    setNnList([]);
    setFilteredList([]);
    setFilterType("");
    setNNTypeList([]);
    setZoneList([]);
  };

  const getNNList = async () => {
    clearData();
    setIsLoading(true);
    try {
      const result = await http.post(url, { ...payload, userId: userId });
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      const sortedData = sortByPoleSuffix(data);
      setNnList(sortedData);
      setNNTypeList(getUniqueValuesNCountByKey(sortedData, "NOTIF_TYPE_DESC"));
      setZoneList(getUniqueValuesNCountByKey(sortedData, "ZONECODE"));
    } catch (e) {}
    setIsLoading(false);
  };

  let listToUse = filteredList.length === 0 ? nnList : filteredList;

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
