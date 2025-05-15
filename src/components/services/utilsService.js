export const convertToCSV = (array) => {
  if (!array.length) return "";

  const keys = Object.keys(array[0]);
  const header = keys.join(",");
  const rows = array.map((obj) => keys.map((key) => `"${obj[key]}"`).join(","));
  return [header, ...rows].join("\n");
};

export const downloadCSV = (data, filename = "data.csv") => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getUniqueValuesByKey = (array, key) => {
  return [...new Set(array.map((item) => item[key]))];
};

export const generateNameIdObjects = (names) => {
  return names.map((name) => {
    const id = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/[^a-z0-9\-]/g, ""); // remove special characters
    return { name, id };
  });
};
