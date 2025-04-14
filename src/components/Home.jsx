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
        <li className="list-group-item">History</li>
      </ul>
    </div>
  );
};

export default Home;
