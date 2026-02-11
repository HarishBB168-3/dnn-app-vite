import { useEffect, useState } from "react";
import http from "../../components/services/httpService";
import { ensureJsonStrict } from "../../components/services/utilsService";
import Card from "./components/Card";
import { backupMtrTypeList, backupWorkTypeList } from "./constants";
import Collapsable from "./components/Collapsable";
import Form from "./components/Form";

const STORAGE_KEY = "history_page";

const HistoryPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [caseReportList, setCaseReportList] = useState([]);
  const [settingsUrl, setSettingsUrl] = useState("");
  const [mtrTypeList, setMtrTypeList] = useState(backupMtrTypeList);
  const [workTypeList, setWorkTypeList] = useState(backupWorkTypeList);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [reportData, setReportData] = useState({
    lastLine: "",
    holdCount: 0,
    finalText: "",
  });

  const handleReportDataChange = (key, value) => {
    setReportData((prev) => ({ ...prev, [key]: value }));
  };

  const url = "https://api.tatapower-ddl.com/mmg2/HistoryNotiMMG";
  const urlProtocol =
    "https://api.tatapower-ddl.com/mmgportal/main_forms/fromGenerateProtocol_mob.aspx?son=";

  const payload = {
    userId: "",
  };

  const getHistoryList = async () => {
    setIsLoading(true);
    try {
      const result = await http.post(url, { ...payload, userId: userId });
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      const sortedItems = [...data].sort((a, b) =>
        b.insertedon.localeCompare(a.insertedon)
      );
      setHistoryList(sortedItems);

      const mCaseReportList = sortedItems.map((obj) => {
        return {
          NOTIFICATION_NO: obj.NOTIFICATION_NO.slice(2),
          Hold_Cancel_type: obj.Hold_Cancel_type,
          mtrType: "",
          workType: "",
          SRV_ORD_NO: obj.SRV_ORD_NO,
        };
      });
      setCaseReportList(mCaseReportList);
    } catch (e) {}
    setIsLoading(false);
  };

  const prepareReport = () => {
    const doneItems = caseReportList
      .filter(
        (item) =>
          item.Hold_Cancel_type === "Done" && item.mtrType && item.workType
      )
      .map(
        (item) => `${item.NOTIFICATION_NO} ${item.mtrType} ${item.workType}`
      );

    const cancelItems = caseReportList
      .filter(
        (item) =>
          item.Hold_Cancel_type === "CANCEL" && item.mtrType && item.workType
      )
      .map((item) => item.NOTIFICATION_NO);

    const reportParts = [...doneItems, ""];

    if (cancelItems.length > 0) {
      reportParts.push("Cancel", ...cancelItems, "");
    }

    if (reportData.holdCount > 0)
      reportParts.push(`${reportData.holdCount} Hold`, "");

    reportParts.push(reportData.lastLine);

    const report = reportParts.join("\n");

    handleReportDataChange("finalText", report);
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("Loaded");
        console.log(parsed);
        if (parsed.settingsUrl) setSettingsUrl(parsed.settingsUrl);
        if (parsed.mtrTypeList) setMtrTypeList(parsed.mtrTypeList);
        if (parsed.workTypeList) setWorkTypeList(parsed.workTypeList);
      }
    } catch (e) {
      console.error("Failed to load saved state", e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    try {
      const stateToSave = {
        settingsUrl,
        mtrTypeList,
        workTypeList,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      console.log("state saved");
      console.log(JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }, [settingsUrl, mtrTypeList, workTypeList]);

  const getDataFromUrl = async (mUrl) => {
    setIsLoading(true);
    try {
      const result = await http.get(mUrl);
      console.log("Status : ", result.status);
      console.log(result);
      const data = ensureJsonStrict(result.data);
      console.log("Parsed successfully");
      setMtrTypeList(data.mtrType);
      setWorkTypeList(data.workType);
    } catch (e) {}
    setIsLoading(false);
  };

  const handleSelectMtrType = (mtrType, idx) => {
    const newCaseReportList = [...caseReportList];
    newCaseReportList[idx].mtrType = mtrType;
    setCaseReportList(newCaseReportList);
    console.log("Selected Mtr Type:", mtrType, idx);
  };

  const handleSelectWorkType = (workType, idx) => {
    const newCaseReportList = [...caseReportList];
    newCaseReportList[idx].workType = workType;
    setCaseReportList(newCaseReportList);
    console.log("Selected Work Type:", workType, idx);
  };

  return (
    <div className="container mt-4">
      <Form
        userId={userId}
        handleUserIdChange={setUserId}
        handleSubmit={getHistoryList}
        prepareReport={prepareReport}
      />

      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {reportData.finalText && (
        <Collapsable
          settingsUrl={settingsUrl}
          setSettingsUrl={setSettingsUrl}
          getDataFromUrl={getDataFromUrl}
          reportData={reportData}
          handleReportDataChange={handleReportDataChange}
        />
      )}

      <h3>History - NN count : {historyList.length}</h3>

      <div className="row">
        {historyList.length === 0 && (
          <li className="list-group-item">Nothing to show</li>
        )}
        {historyList.map((item, idx) => (
          <Card
            key={item.NOTIFICATION_NO}
            index={idx}
            item={item}
            mtrTypeList={mtrTypeList}
            workTypeList={workTypeList}
            caseReportList={caseReportList}
            handleSelectMtrType={handleSelectMtrType}
            handleSelectWorkType={handleSelectWorkType}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
