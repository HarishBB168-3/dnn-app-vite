import { useCallback, useState } from "react";
import Card from "./components/Card";
import Collapsable from "./components/Collapsable";
import Form from "./components/Form";
import { backupMtrTypeList, backupWorkTypeList } from "./constants";
import useLocalStorage from "./hooks/useLocalStorage";
import useHistoryData from "./hooks/useHistoryData";
import { buildReport } from "./utils/buildReport";
import Collapse from "../../components/common/Collapse";
import CollapseButton from "../../components/common/CollapseButton";

const STORAGE_KEY = "history_page";

const HistoryPage = () => {
  const [userId, setUserId] = useState("");

  const [settings, setSettings] = useLocalStorage(STORAGE_KEY, {
    settingsUrl: "",
    mtrTypeList: backupMtrTypeList,
    workTypeList: backupWorkTypeList,
  });

  const {
    historyList,
    caseReportList,
    setCaseReportList,
    loading,
    getHistoryList,
    getSettingsFromUrl,
  } = useHistoryData();

  const [reportData, setReportData] = useState({
    lastLine: "",
    holdCount: 0,
    finalText: "",
  });

  const handleReportDataChange = (key, value) => {
    setReportData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePrepareReport = () => {
    const finalText = buildReport({
      caseReportList,
      holdCount: reportData.holdCount,
      lastLine: reportData.lastLine,
    });

    handleReportDataChange("finalText", finalText);
  };

  const getDataFromUrl = async (mUrl) => {
    try {
      const data = await getSettingsFromUrl(mUrl);
      setSettings((prev) => ({
        ...prev,
        mtrTypeList: data.mtrType,
        workTypeList: data.workType,
      }));
    } catch (e) {
      console.log("Error occured : ", e);
    }
  };

  const handleSelectMtrType = useCallback(
    (mtrType, idx) => {
      setCaseReportList((prev) =>
        prev.map((item, i) => (i === idx ? { ...item, mtrType } : item))
      );
    },
    [setCaseReportList]
  );

  const handleSelectWorkType = useCallback(
    (workType, idx) => {
      setCaseReportList((prev) =>
        prev.map((item, i) => (i === idx ? { ...item, workType } : item))
      );
    },
    [setCaseReportList]
  );

  return (
    <div className="container mt-4">
      <Form
        userId={userId}
        handleUserIdChange={setUserId}
        handleSubmit={() => getHistoryList(userId)}
        prepareReport={handlePrepareReport}
      >
        <CollapseButton
          className="btn btn-sm btn-success my-2"
          targetCollapseId="reportCollapse"
        >
          Report
        </CollapseButton>
        <Collapse id="reportCollapse">
          <button
            type="submit"
            className="btn btn-sm btn-info my-2"
            onClick={(e) => {
              e.preventDefault();
              handlePrepareReport();
            }}
          >
            Prepare Report
          </button>
          <Collapsable
            settingsUrl={settings.settingsUrl}
            setSettingsUrl={(url) =>
              setSettings((prev) => ({ ...prev, settingsUrl: url }))
            }
            getDataFromUrl={getDataFromUrl}
            reportData={reportData}
            handleReportDataChange={handleReportDataChange}
          />
        </Collapse>
      </Form>

      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
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
            mtrTypeList={settings.mtrTypeList}
            workTypeList={settings.workTypeList}
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
