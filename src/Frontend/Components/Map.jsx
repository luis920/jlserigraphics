import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "Leaflet/dist/Leaflet.css";

const Mapa = () => {
  const position = [26.920428538870024, -101.3958088213];

  // Crear un ícono personalizado
  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.freepik.com/512/391/391278.png",
    iconSize: [30, 30],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  return (
    <MapContainer
      center={position}
      zoom={18}
      style={{ width: "50%", height: "500px", marginLeft: "100px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={position} icon={customIcon}>
        <Popup>JL Serigraphics</Popup>
      </Marker>
    </MapContainer>
  );
};
export default Mapa;
