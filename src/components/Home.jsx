import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/notepad">Notepad</Link>
        </li>
        <li className="list-group-item">
          <Link to="/nnlist">NN List</Link>
        </li>
        <li className="list-group-item">
          <Link to="/cadetails">CA Details</Link>
        </li>
        <li className="list-group-item">
          <Link to="/camdata">CA MData</Link>
        </li>
        <li className="list-group-item">
          <Link to="/sllist">Seals Details</Link>
        </li>
        <li className="list-group-item">
          <Link to="/history">History</Link>
        </li>
        <li className="list-group-item">
          <Link to="/poleAdvSearch">Pole Search</Link>
        </li>
        <li className="list-group-item">
          <Link to="/soDownload">SO Download</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
