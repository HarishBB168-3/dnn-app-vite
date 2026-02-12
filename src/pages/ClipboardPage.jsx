import { useEffect, useState } from "react";
import Accordion from "../components/common/Accordion";
import AccordionItem from "../components/common/AccordionItem";
import http from "../components/services/httpService";
import {
  copyToClipboard,
  ensureJsonStrict,
} from "../components/services/utilsService";
import CollapseButton from "../components/common/CollapseButton";
import Collapse from "../components/common/Collapse";

const STORAGE_KEY = "clipboard_page";

const ClipboardPage = () => {
  const [backendDataUrl, setBackendDataUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [clipboard, setClipboard] = useState([]);
  const [newItem, setNewItem] = useState({ title: "", text: "" });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        console.log("Loaded");
        console.log(parsed);
        if (parsed.backendDataUrl) setBackendDataUrl(parsed.backendDataUrl);
        if (parsed.clipboard) setClipboard(parsed.clipboard);
      }
    } catch (e) {
      console.error("Failed to load saved state", e);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;

    try {
      const stateToSave = {
        backendDataUrl,
        clipboard,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      console.log("state saved");
      console.log(JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }, [backendDataUrl, clipboard]);

  const getDataFromUrl = async (mUrl) => {
    setIsLoading(true);
    try {
      const result = await http.get(mUrl);
      console.log("Status : ", result.status);
      console.log(result);
      const data = ensureJsonStrict(result.data);
      console.log("Parsed successfully");
      console.log(data);

      setClipboard((prev) =>
        prev.concat(
          data.filter((nItem) => !prev.some((pItem) => pItem.id === nItem.id))
        )
      );
    } catch (e) {
      console.log("Error occured : ", e);
    }
    setIsLoading(false);
  };

  const handleSaveNewItem = () => {
    setClipboard((prev) => [...prev, { id: Date.now(), ...newItem }]);
    setNewItem({ title: "", text: "" });
  };

  const handleClearClipboard = () => {
    const updatedState = {
      backendDataUrl,
      clipboard: [],
    };
    setClipboard([]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
  };

  const isNewItemEmpty =
    !newItem.title ||
    newItem.title.trim() === "" ||
    !newItem.text ||
    !newItem.text.trim() === "";

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h5 className="mb-0">Clipboard</h5>

        <div className="d-flex gap-2">
          {isLoading && (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          <CollapseButton
            className="btn btn-sm btn-primary"
            targetCollapseId="exportCollapse"
          >
            <i className="bi bi-menu-button"></i>
          </CollapseButton>
        </div>
      </div>

      {/* Export Collapse Panel */}
      <Collapse id={"exportCollapse"}>
        <div className="card card-body border">
          <div className="row g-2 align-items-end">
            <div className="input-group mb-3">
              <span className="input-group-text" id="backendUrl">
                Backend Url
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Backend Data Url"
                aria-label="Backend Data Url"
                aria-describedby="backendUrl"
                id="backendUrl"
                value={backendDataUrl}
                onChange={(e) => setBackendDataUrl(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  getDataFromUrl(backendDataUrl);
                }}
              >
                Load Data
              </button>
            </div>
            <div className="input-group">
              <span className="input-group-text" id="titleLabel">
                Title
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                aria-label="Title"
                aria-describedby="titleLabel"
                id="title"
                value={newItem.title}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            <div className="input-group">
              <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder="Content..."
                value={newItem.text}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, text: e.target.value }))
                }
              ></textarea>
            </div>

            <div className="col-md-3 d-flex gap-2">
              <button
                className="btn btn-sm btn-success w-100"
                onClick={handleSaveNewItem}
                disabled={isNewItemEmpty}
              >
                Save
              </button>
              <button
                className="btn btn-sm btn-outline-secondary w-100"
                data-bs-toggle="collapse"
                data-bs-target="#exportCollapse"
              >
                Cancel
              </button>
            </div>
            <div className="col-md-3 d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary w-100"
                onClick={() => {
                  const prettified = JSON.stringify(clipboard, null, 2);
                  copyToClipboard(prettified);
                }}
              >
                Copy All Json
              </button>
              <button
                className="btn btn-sm btn-outline-danger w-100"
                onClick={(e) => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear all local items?"
                    )
                  ) {
                    handleClearClipboard();
                    getDataFromUrl(backendDataUrl);
                  }
                }}
              >
                Clear Local
              </button>
            </div>
          </div>
        </div>
      </Collapse>

      <Accordion id="clipboardAccordion">
        {clipboard.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            parentId="clipboardAccordion"
          >
            <div className="d-flex align-items-start">
              <div className="flex-grow-1 pe-2">{item.text}</div>
              <button
                onClick={() => copyToClipboard(item.text)}
                className="btn btn-sm btn-outline-secondary"
              >
                Copy
              </button>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ClipboardPage;
