import { useState } from "react";
import Collapse from "../../components/common/Collapse";
import CollapseButton from "../../components/common/CollapseButton";
import DBInUseSelect from "./components/DBInUseSelect";
import DBManage from "./components/DBManage";
import Search from "./components/Search";

const SpreadSheetExplorerPage = () => {
  const [databases, setDatabases] = useState([]);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5 className="mb-0">Spread Sheet Explorer</h5>

        <div className="d-flex gap-2">
          <CollapseButton
            className="btn btn-sm btn-primary"
            targetCollapseId="dbManager"
          >
            Manage DB
          </CollapseButton>
          <CollapseButton
            className="btn btn-sm btn-primary"
            targetCollapseId="dbInUse"
          >
            DB in use
          </CollapseButton>
        </div>
      </div>

      {/* Storing / Deleting databases */}
      <Collapse id="dbManager">
        <DBManage />
      </Collapse>

      {/* Listing all store databases */}
      <Collapse id="dbInUse">
        <DBInUseSelect databases={databases} setDatabases={setDatabases} />
      </Collapse>

      {/* Search query input */}

      {/* Output as table */}
      <Search databases={databases.filter((dbItem) => dbItem.inUse)} />
    </div>
  );
};

export default SpreadSheetExplorerPage;
