import { useCallback, useMemo, useState } from "react";
import { getUniqueValuesNCountByKey } from "../../../components/services/utilsService";
import { filterList, sortByDate, sortByPoleSuffix } from "../utils";
import { fetchNNList } from "../services/nnListPageService";

const useNNListData = ({ userId }) => {
  const [loading, setIsLoading] = useState(false);
  const [nnList, setNnList] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    filterType: "",
    showExtraData: false,
    sortByIssueDate: false,
  });
  const [showAddressInAccrd, setShowAddressInAccrd] = useState(false);

  const uniqueNNTypeList = useMemo(() => {
    return getUniqueValuesNCountByKey(nnList, "NOTIF_TYPE_DESC");
  }, [nnList]);

  const uniqueZoneList = useMemo(() => {
    return getUniqueValuesNCountByKey(nnList, "ZONECODE");
  }, [nnList]);

  const listToUse = useMemo(() => {
    let result = filterOptions.filterType
      ? filterList(nnList, "NOTIF_TYPE_DESC", filterOptions.filterType)
      : nnList;

    if (filterOptions.sortByIssueDate) {
      result = sortByDate(result, "SERVICE_ORD_DATE", "desc");
    }

    return result;
  }, [nnList, filterOptions]);

  const clearData = () => {
    setNnList([]);
    setFilterOptions({
      filterType: "",
      showExtraData: false,
      sortByIssueDate: false,
    });
  };

  const getNNList = useCallback(async () => {
    clearData();
    setIsLoading(true);
    try {
      const data = await fetchNNList(userId);
      setNnList(sortByPoleSuffix(data));
    } catch (e) {
      console.error("Error occurred:", e);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  return {
    loading,
    filterOptions,
    setFilterOptions,
    showAddressInAccrd,
    setShowAddressInAccrd,
    uniqueNNTypeList,
    uniqueZoneList,
    getNNList,
    listToUse,
  };
};

export default useNNListData;
