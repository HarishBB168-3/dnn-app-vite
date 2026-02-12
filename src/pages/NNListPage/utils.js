export function sortByPoleSuffix(arr, order = "asc") {
  const normalizePoleForSort = (pole) => {
    if (!pole || typeof pole !== "string") return "";

    const hasHT = pole.startsWith("HT");
    const withoutHT = hasHT ? pole.slice(2) : pole;

    const [main, suffix] = withoutHT.split("-");
    if (!suffix) return withoutHT;

    const paddedSuffix = suffix
      .split("/")
      .map((seg) => {
        const num = seg.match(/\d+/); // extract digits
        return num ? num[0].padStart(4, "0") : null;
      })
      .filter(Boolean) // remove non-numeric segments
      .join("/");

    const normalized = `${main}-${paddedSuffix}`;
    return normalized;
  };

  return arr.sort((a, b) => {
    const valA = normalizePoleForSort(a.POLE);
    const valB = normalizePoleForSort(b.POLE);

    return order === "asc"
      ? valA.localeCompare(valB, undefined, { numeric: true })
      : valB.localeCompare(valA, undefined, { numeric: true });
  });
}

export function filterList(list, key, searchTerm) {
  return list.filter((item) => {
    const value = item[key];
    return (
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}

export function sortByDate(arr, key, order = "asc") {
  return arr.sort((a, b) => {
    // Parse dd-mm-yyyy into Date objects
    const [dayA, monthA, yearA] = a[key].split("-").map(Number);
    const [dayB, monthB, yearB] = b[key].split("-").map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    // Compare based on order
    if (order === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
}
