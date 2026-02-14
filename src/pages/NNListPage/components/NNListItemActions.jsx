import { useCallback, useMemo, useState } from "react";
import { getPoleGPSLink } from "../../../components/services/poleService";
import { copyToClipboard } from "../../../components/services/utilsService";

const Button = ({ children, colorClass, ...props }) => {
  return (
    <button
      type="button"
      className={`btn btn-sm btn-primary ${colorClass} me-1 mb-1`}
      {...props}
    >
      {children}
    </button>
  );
};

const NNListItemActions = ({ data }) => {
  const { NOTIFICATION_NO, POLE, OLD_METER_NO } = data || {};

  const [poleLink, setPoleLink] = useState("");
  const [loadingPoleLink, setLoadingPoleLink] = useState(false);

  const cmgLink = useMemo(() => {
    if (!NOTIFICATION_NO) return "";
    return `https://api.tatapower-ddl.com/cmg2/main_forms/frmSVRGenerate.aspx?Name=${NOTIFICATION_NO}`;
  }, [NOTIFICATION_NO]);

  const openInNewTab = useCallback((url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  const handleCopy = useCallback((value) => {
    if (!value) return;
    copyToClipboard(value);
  }, []);

  const handleGetPoleLink = useCallback(async () => {
    if (!POLE) return;

    try {
      setLoadingPoleLink(true);
      const link = await getPoleGPSLink(POLE);
      setPoleLink(link);
    } catch (error) {
      console.error("Failed to fetch pole link:", error);
    } finally {
      setLoadingPoleLink(false);
    }
  }, [POLE]);

  return (
    <div className="col-md-6 mb-2">
      {/* CMG Link */}
      {cmgLink && (
        <>
          <a href={cmgLink} target="_blank" rel="noopener noreferrer">
            CMG Link
          </a>
          <br />
        </>
      )}
      <strong>Notif #:</strong> {NOTIFICATION_NO || "N/A"}
      {NOTIFICATION_NO && (
        <Button
          colorClass="btn-warning"
          onClick={(e) => copyToClipboard(NOTIFICATION_NO)}
        >
          Copy
        </Button>
      )}
      <br />
      {/* Pole section */}
      <strong>Pole:</strong> {POLE || "N/A"}
      {POLE && (
        <>
          <Button colorClass="btn-warning" onClick={(e) => handleCopy(POLE)}>
            Copy
          </Button>
          <Button
            colorClass="btn-success"
            onClick={handleGetPoleLink}
            disabled={loadingPoleLink}
          >
            {loadingPoleLink ? "Loading..." : "Get Link"}
          </Button>
          <Button onClick={() => openInNewTab(`/poleAdvSearch?poleNo=${POLE}`)}>
            Treat Link
          </Button>
          {poleLink && (
            <>
              <br />
              <a href={poleLink} target="_blank" rel="noopener noreferrer">
                {poleLink}
              </a>
            </>
          )}
        </>
      )}
      <br />
      <Button
        colorClass="btn-dark"
        onClick={() => openInNewTab(`/notepad?nn=${NOTIFICATION_NO}`)}
      >
        Notepad History
      </Button>
      <br />
      <Button
        colorClass="btn-info"
        onClick={() => openInNewTab(`/meterSeals?mNo=${OLD_METER_NO}`)}
        disabled={!OLD_METER_NO}
      >
        Meter Seals - {OLD_METER_NO || "N/A"}
      </Button>
      <br />
      <Button
        colorClass="btn-danger"
        onClick={() => openInNewTab(`/holdRemarks?nn=${NOTIFICATION_NO}`)}
        disabled={!NOTIFICATION_NO}
      >
        Hold Remark
      </Button>
    </div>
  );
};

export default NNListItemActions;
