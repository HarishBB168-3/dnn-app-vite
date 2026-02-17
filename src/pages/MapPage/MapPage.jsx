import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix marker icon
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const FitBounds = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds);
    }
  }, [points, map]);

  return null;
};

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const [points, setPoints] = useState([]);
  const [showPermanentLabels, setShowPermanentLabels] = useState(false);

  useEffect(() => {
    const locationParam = searchParams.get("locations");
    const labelParam = searchParams.get("labels");

    if (!locationParam) return;

    const locationList = locationParam.split("/");
    const labelList = labelParam ? labelParam.split(":") : [];

    const parsedPoints = locationList
      .map((item, index) => {
        const [lat, lng] = item.split(",").map(Number);
        if (isNaN(lat) || isNaN(lng)) return null;
        return {
          lat,
          lng,
          label: labelList[index] || `Point ${index + 1}`,
        };
      })
      .filter(Boolean);

    setPoints(parsedPoints);
  }, [searchParams]);

  return (
    <div>
      <h3>Dynamic Map from URL</h3>
      {/* Toggle Button */}
      <button
        onClick={() => setShowPermanentLabels((prev) => !prev)}
        className="btn btn-sm btn-primary"
      >
        {showPermanentLabels
          ? "Switch to Click Labels"
          : "Show Permanent Labels"}
      </button>

      <MapContainer
        center={[28.6139, 77.209]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds points={points} />

        {points.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lng]}>
            {showPermanentLabels ? (
              <Tooltip permanent direction="top" offset={[0, -10]}>
                <strong>{point.label}</strong>
              </Tooltip>
            ) : (
              <Popup>
                <strong>{point.label}</strong>
                <br />
                Lat: {point.lat}
                <br />
                Lng: {point.lng}
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
