import http from "./httpService";

const URL = "https://app.tatapower-ddl.com/searchgis/api/pole/Pole_Details";

const baseLink = "https://www.google.com/maps/search/?api=1&query=";

const payload = { remarks: "" };

export async function getPoleGPSLink(poleno, username = "harish.96") {
  const result = await http.post(URL, { ...payload, poleno, username });

  if (result.data.msg === "Success")
    return baseLink + result.data.latitude + "," + result.data.longitude;
  else {
    console.log("result : ", result);
    return result.data.msg;
  }
}

export default {
  getPoleGPSLink,
};
