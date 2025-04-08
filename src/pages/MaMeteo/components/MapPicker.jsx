import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// Correction pour l'icône par défaut de Leaflet
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';



export default function MapPicker({onMapClick}) { //onMapClick props fonction envoyée depuis MaMeteo

  const [coordinates, setCoordinates] = useState({  lat: 43.5310, lng: 7.035}); // Coordonnées par défaut
  const defaultIcon = L.icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadowPng,
    iconSize: [25, 41], // Taille standard des icônes Leaflet
    iconAnchor: [12, 41], // Position de l'ancrage
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  const mapRef = useRef(); // Utilisation d'un ref pour accéder à l'instance de la carte

  // Composant pour gérer les clics sur la carte
function ClickableMap() {  
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoordinates({ lat, lng }); // il faut aussi modifier les coordonnées en local, dans ce composant
      onMapClick( lat, lng ); // Envoie les coordonnées choisies à MaMeteo
       // Recentre la carte sur les nouvelles coordonnées
        if (mapRef.current) {
          mapRef.current.flyTo([lat, lng], 13); // Utilise flyTo pour recentrer en douceur
        }
        // 🔽 Redirection vers l'ancre
 // Scroll vers la div avec l'id "donneesMeteo"
 const anchor = document.getElementById("donneesMeteo");
 if (anchor) {
   anchor.scrollIntoView({ behavior: "smooth" });
 }    },
  });
  return null;
}
  return (
     <div>
      <h2 className='bg-color'>Choisissez un emplacement</h2>
      <MapContainer
      className='bg-color'
        center={[coordinates.lat, coordinates.lng]} // Centre initial de la carte
        zoom={13}
        style={{ height: '80vh', width: '100%' }}
        dragging={true}
        whenCreated={(mapInstance) => { mapRef.current = mapInstance }} // Enregistre l'instance de la carte dans le ref
      
      >
        {/* Affichage des tuiles OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* Marqueur aux coordonnées choisies */}
        <Marker position={[coordinates.lat, coordinates.lng]} icon={defaultIcon} />
        {/* Composant pour gérer les clics sur la carte */}
        <ClickableMap />
      </MapContainer>

      {/* <div style={{ marginTop: '20px' }}>
        <h3>Coordonnées choisies :</h3>
        <p>Latitude: {coordinates.lat.toFixed(4)}</p>
        <p>Longitude: {coordinates.lng.toFixed(4)}</p>
      </div> */}
    </div>
  );
}
