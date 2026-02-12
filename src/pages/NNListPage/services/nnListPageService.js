import http from "../../../components/services/httpService";

const NNLIST_URL = "https://api.tatapower-ddl.com/mmg2/GetCustomerDetailsMMG";

const payload = {
  userId: "",
  insertedon: 0,
  APK_VERSION: "CMM_2.3.6",
};

export const fetchNNList = async (userId) => {
  const result = await http.post(NNLIST_URL, { ...payload, userId });
  return JSON.parse(result.data);
};
