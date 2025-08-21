import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPoleGPSLink } from "./services/poleService";

const PoleAdvancedSearchPage = () => {
  const [poleNo, setPoleNo] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);

  const generateModifiedTexts = (input) => {
    const parts = input.split("/");

    const lastSegmentStr = parts[parts.length - 1];
    const lastSegment = parseInt(lastSegmentStr, 10);

    if (isNaN(lastSegment)) return [];

    let results = [];

    if (lastSegment === 1) {
      const plusOne = [...parts];
      plusOne[plusOne.length - 1] = lastSegment + 1;
      results.push(plusOne.join("/"));

      const plusTwo = [...parts];
      plusTwo[plusTwo.length - 1] = lastSegment + 2;
      results.push(plusTwo.join("/"));
    } else {
      const minusOne = [...parts];
      minusOne[minusOne.length - 1] = lastSegment - 1;
      results.push(minusOne.join("/"));

      const plusOne = [...parts];
      plusOne[plusOne.length - 1] = lastSegment + 1;
      results.push(plusOne.join("/"));
    }

    const removeLast = parts.slice(0, -1).join("/");
    results.push(removeLast);

    return results;
  };

  const generateLinks = async (plNo) => {
    const results = [];
    const poleNos = [plNo, ...generateModifiedTexts(plNo)];

    setIsLoading(true);

    for (const item of poleNos) {
      const poleLink = await getPoleGPSLink(item);
      results.push({ poleNo: item, link: poleLink });
    }
    setResult(results);
    setIsLoading(false);
  };

  useEffect(() => {
    const poleNo = queryParams.get("poleNo");

    if (poleNo) {
      // ? Query params are present
      console.log("Getting poleNo from url with:", { poleNo });

      setPoleNo(poleNo);
      generateLinks(poleNo);
      // Put your logic here, e.g.:
      // fetchData(type, value);
    } else {
      // ?? Missing query params
      console.log("Default poleNo page");
    }
  }, [search]); // re-run if the query string changes

  useEffect(() => {
    document.title = `Pole : ${poleNo}`;
  }, [poleNo]);

  return (
    <div className="container mt-4">
      <form>
        <div className="mb-3">
          <label htmlFor="poleNo" className="form-label">
            Pole No
          </label>
          <input
            type="text"
            className="form-control"
            id="poleNo"
            value={poleNo}
            onChange={(e) => setPoleNo(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            generateLinks(poleNo);
          }}
        >
          Submit
        </button>
      </form>

      <h3>Possible pole nos : </h3>

      {isLoading && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div className="row">
        <h1>Result</h1>

        <ul className="list-group mt-2">
          {result.map((item, idx) => {
            return (
              <li className="list-group-item" key={idx}>
                {item.poleNo}
                <button
                  type="button"
                  className="btn btn-sm btn-success ms-2"
                  onClick={(e) => {
                    navigate("/poleAdvSearch?poleNo=" + item.poleNo);
                  }}
                >
                  Use
                </button>
                <br />
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.link}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PoleAdvancedSearchPage;
