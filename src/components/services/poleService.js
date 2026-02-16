import http from "./httpService";

const URL = "https://app.tatapower-ddl.com/searchgis/api/pole/Pole_Details";

const baseLink = "https://www.google.com/maps/search/?api=1&query=";

const payload = { remarks: "" };

export async function getPoleGPSLink(poleno) {
  const result = await http.post(URL, { ...payload, poleno });

  if (result.data.msg === "Success")
    return baseLink + result.data.latitude + "," + result.data.longitude;
  else {
    console.log("result : ", result);
    return result.data.msg;
  }
}

export async function getPoleLatLong(poleno) {
  const result = await http.post(URL, { ...payload, poleno });

  if (result.data.msg === "Success")
    return [result.data.latitude, result.data.longitude];
  else {
    console.log("result : ", result);
    return "";
  }
}

export default {
  getPoleGPSLink,
};
