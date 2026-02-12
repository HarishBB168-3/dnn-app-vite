import { useState, useCallback } from "react";
import { fetchHistory, fetchSettingsFromUrl } from "../services/historyService";

const useHistoryData = () => {
  const [historyList, setHistoryList] = useState([]);
  const [caseReportList, setCaseReportList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHistoryList = useCallback(async (userId) => {
    try {
      setLoading(true);
      const data = await fetchHistory(userId);

      const sorted = [...data].sort((a, b) =>
        b.insertedon.localeCompare(a.insertedon)
      );

      setHistoryList(sorted);

      setCaseReportList(
        sorted.map((obj) => ({
          NOTIFICATION_NO: obj.NOTIFICATION_NO.slice(2),
          Hold_Cancel_type: obj.Hold_Cancel_type,
          mtrType: "",
          workType: "",
          SRV_ORD_NO: obj.SRV_ORD_NO,
          cableLength: 0,
          busbarInst: false,
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  }, []);

  const getSettingsFromUrl = useCallback(async (url) => {
    try {
      setLoading(true);
      const data = await fetchSettingsFromUrl(url);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    historyList,
    caseReportList,
    setCaseReportList,
    loading,
    error,
    getHistoryList,
    getSettingsFromUrl,
  };
};

export default useHistoryData;
