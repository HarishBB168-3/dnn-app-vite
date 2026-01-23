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

export const getUniqueValuesNCountByKey = (array, key) => {
  const frequencyMap = new Map();
  for (const item of array) {
    frequencyMap.set(item[key], (frequencyMap.get(item[key]) || 0) + 1);
  }
  return frequencyMap;
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

export const copyToClipboard = (text) => {
  if (navigator.clipboard && text) {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard: " + text);
    });
  } else {
    alert("Unable to copy : " + text);
    console.log(navigator);
  }
};

export const ensureJsonStrict = (value) => {
  if (typeof value === "string") {
    return JSON.parse(value);
  }

  if (typeof value === "object" && value !== null) {
    return value;
  }

  throw new Error("Value is not valid JSON");
};
