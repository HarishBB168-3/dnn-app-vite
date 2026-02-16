import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import L from "leaflet";

const FitBounds = ({ locations }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations);
      map.fitBounds(bounds);
    }
  }, [locations, map]);

  return null;
};

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const locationParam = searchParams.get("locations");

    if (!locationParam) return;

    const parsedLocations = locationParam
      .split("/")
      .map((item) => {
        const [lat, lng] = item.split(",").map(Number);
        return [lat, lng];
      })
      .filter((coords) => !isNaN(coords[0]) && !isNaN(coords[1]));

    setLocations(parsedLocations);
  }, [searchParams]);

  return (
    <div>
      <h3>Dynamic Map from URL</h3>

      <MapContainer
        center={[28.6139, 77.209]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds locations={locations} />

        {locations.map((position, index) => (
          <Marker key={index} position={position}>
            <Popup>
              Point {index + 1} <br />
              Lat: {position[0]} <br />
              Lng: {position[1]}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
