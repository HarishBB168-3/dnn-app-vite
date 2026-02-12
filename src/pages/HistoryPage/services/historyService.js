import http from "../../../components/services/httpService";
import { ensureJsonStrict } from "../../../components/services/utilsService";

const HISTORY_URL = "https://api.tatapower-ddl.com/mmg2/HistoryNotiMMG";

export const fetchHistory = async (userId) => {
  const result = await http.post(HISTORY_URL, { userId });
  return JSON.parse(result.data);
};

export const fetchSettingsFromUrl = async (url) => {
  const result = await http.get(url);
  return ensureJsonStrict(result.data);
};
