import { useEffect, useState } from "react";
import { loadDatabases } from "../db";
import Accordion from "../../../components/common/Accordion";
import AccordionItem from "../../../components/common/AccordionItem";

const DBInUseSelect = ({ databases, setDatabases }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleLoadDatabase();
  }, []);

  const handleLoadDatabase = async () => {
    setLoading(true);
    const detailedList = await loadDatabases();
    setDatabases(detailedList.map((item) => ({ db: item, inUse: false })));
    setLoading(false);
  };

  const handleDbItemUseChange = (isInUse, index) => {
    const newList = [...databases];
    databases[index].inUse = isInUse;
    setDatabases(newList);
  };

  return (
    <div className="card card-body border">
      <div>
        <button
          type="button"
          className="btn btn-secondary btn-sm mb-2"
          onClick={handleLoadDatabase}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}
          Refresh
        </button>
      </div>
      <Accordion id="dbsListAcc">
        {databases.map((dbItem, idx) => (
          <AccordionItem
            key={dbItem.db.name}
            id={dbItem.db.name}
            title={dbItem.db.name}
            parentId="dbListAcc"
            actionBtn={
              <CheckBox
                id={`chkbox_${dbItem.db.name}_${idx}`}
                label="Using"
                checked={dbItem.inUse}
                onChange={(e) => handleDbItemUseChange(e.target.checked, idx)}
              />
            }
          >
            <div className="d-flex align-items-start">TODO</div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DBInUseSelect;

const CheckBox = ({ id, label, ...props }) => {
  return (
    <div className="form-check mx-3" {...props}>
      <input className="form-check-input" type="checkbox" value="" id={id} />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
