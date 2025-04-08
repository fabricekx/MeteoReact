import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import WindChart from "./WindChart";

// Fonction pour récupérer les données météo
const fetchWeatherData = async ({ queryKey }) => {
  const [_, latitude, longitude] = queryKey;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=wind_direction_10m,wind_gusts_10m&hourly=wind_speed_10m,rain,wind_direction_10m,wind_gusts_10m&wind_speed_unit=kn&timezone=Europe%2FBerlin&forecast_days=3&models=meteofrance_seamless`;

  const response = await axios.get(url);
  return response.data;
};

// Composant FetchMeteo
export default function FetchMeteo({ latitude, longitude }) {
  // console.log("nouvelles coordonnée fetch" + latitude + longitude)
  const queryClient = useQueryClient();

  const {
    data: weatherData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["weatherData", latitude, longitude], // Latitude et longitude dans la clé de requête
    queryFn: fetchWeatherData, 
    enabled: !!latitude && !!longitude, // Requête activée seulement si les coordonnées sont valides
  });

  if (isLoading) return <div>Chargement des données...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div className="bg-color">
      <h2 id="donneesMeteo" >Données météo</h2>
      {weatherData && weatherData.hourly ? (
        <div className="bg-color">
          {console.log(weatherData.hourly)}
          {/* Vérification supplémentaire sur les données disponibles */}
          <WindChart windData={weatherData.hourly} />
        </div>
      ) : (
        <p>Pas de données disponibles pour cet emplacement.</p>
      )}
    </div>
  );
}
