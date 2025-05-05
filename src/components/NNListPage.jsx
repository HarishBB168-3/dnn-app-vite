import { useEffect, useState } from "react";
import http from "./services/httpService";
import { downloadCSV } from "./services/utilsService";
import ServiceOrderAccordion from "./ServiceOrderAccordion";

const filterTypes = [
  { name: "all", label: "All", term: "" },
  { name: "internal", label: "Internal", term: "Internal Analysis" },
  { name: "mrg", label: "MRG", term: "MRG Initiated" },
  { name: "rrg", label: "RRG", term: "RRG Initiated D/Transfer" },
  { name: "website", label: "Website", term: "Website" },
  { name: "walkin", label: "Cons. Walk In", term: "Walk" },
];

const NNListPage = () => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nnList, setNnList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [filterType, setFilterType] = useState(
    filterTypes.find((i) => i.name === "all")
  );

  useEffect(() => {
    const data = [...nnList];
    const result = filterList(data, "SOURCE", filterType.term);
    console.log("Filter result : ", result);
    setFilteredList(result);
  }, [filterType]);

  const url = "https://api.tatapower-ddl.com/mmg2/GetCustomerDetailsMMG";

  const payload = {
    userId: "",
    insertedon: 0,
    APK_VERSION: "CMM_2.3.6",
  };

  function sortByPoleSuffix(arr, order = "asc") {
    return arr.sort((a, b) => {
      const cleanPole = (pole) => {
        if (!pole || typeof pole !== "string") return "";
        return pole.startsWith("HT") ? pole.slice(2) : pole;
      };

      const valA = cleanPole(a.POLE).replace("-", "");
      const valB = cleanPole(b.POLE).replace("-", "");

      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }

  function filterList(list, key, searchTerm) {
    return list.filter((item) => {
      const value = item[key];
      return (
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  const getNNList = async () => {
    setIsLoading(true);
    try {
      const result = await http.post(url, { ...payload, userId: userId });
      console.log("Status : ", result.status);
      const data = JSON.parse(result.data);
      console.log(data);
      const sortedData = sortByPoleSuffix(data);
      setNnList(sortedData);
    } catch (e) {}
    setIsLoading(false);
  };

  const listToUse = filteredList.length === 0 ? nnList : filteredList;

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User Id
          </label>
          <input
            type="text"
            className="form-control"
            id="userId"
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            getNNList();
          }}
        >
          Submit
        </button>
      </form>

      <button
        className="btn btn-info btn-sm my-3"
        onClick={() => downloadCSV(listToUse)}
      >
        Download as CSV
      </button>

      <div className="d-flex gap-2">
        {filterTypes.map((item, index) => (
          <div className="form-check" key={index}>
            <input
              className="form-check-input"
              type="radio"
              name="filterType"
              id={item.name}
              onChange={() => setFilterType({ ...item })}
              checked={item.name === filterType.name}
            />
            <label className="form-check-label" htmlFor={item.name}>
              {item.label}
            </label>
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <h3>Total NN : {listToUse.length}</h3>

      <ul className="list-group mt-2">
        {listToUse.length === 0 && (
          <li className="list-group-item">Nothing to show</li>
        )}

        {listToUse.map((item, index) => (
          <ServiceOrderAccordion key={index} data={item} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default NNListPage;
