import React from 'react';
import { ComposedChart, Area, Line,Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import WindDirection from './WindDirection';
import { TbArrowDownTail } from 'react-icons/tb'; // Icône flèche pour direction du vent
import '../css/windchart.css'

const WindChart = ({ windData }) => {
  // Transformation des données de vent
  const transformedData = windData.time.map((time, index) => {
    const windSpeed = windData.wind_speed_10m[index];
    const windGusts = windData.wind_gusts_10m[index];
const windDirection = windData.wind_direction_10m[index];
const rain = windData.rain[index];
let rainColor;
if (rain <= 3) {
  rainColor = "#4CD8E4"; // Faible précipitation
} else if (rain <= 7) {
  rainColor = "#CF3004"; // Précipitations modérées
} else {
  rainColor = "#FB3535"; // Forte précipitation
}
    // Conversion de la chaîne de date en objet Date
    const date = new Date(time);
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });

    // Format personnalisé : Affiche "Jour Mois" pour 00h, sinon affiche juste l'heure
    const formattedTime = hours === 0 ? `${day} ${month}` : `${hours}`;

 

    return {
      time: formattedTime,  // Heure ou jour/mois
      windSpeed,            // Vitesse du vent
      windGusts,           // Rafales
      windDirection,
      rain, 
      rainColor
    };
  });
  // Fonction personnalisée pour afficher les flèches des directions du vent
  const renderWindDirectionTicks = ({ payload, x, y }) => {
    const rotationDegrees = payload.value;  // payload.value doit être la direction du vent en degrés
    return (
      <g transform={`translate(${x},${y+10})`} textAnchor="middle">
        <g transform={`rotate(${rotationDegrees}, 6, 6)`}>  {/* Rotation appliquée directement ici
        le 6,6 correspond au centre de l'image (si comme ici elle fait 12 pixels, le 0,0 correspond au coin supérieur gauche) */}
          <TbArrowDownTail fontSize="12px" />  {/* Supprimer transform du style */}
        </g>
      </g>
    );
  };
  //console.log(transformedData);
  const getGradientForMaxSpeed = (maxSpeed) => {
    if (maxSpeed <= 2) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' }, // Blue for 0 knots
        { offset: '100%', stopColor: '#74FA59' } // Turquoise for 2 knots
      ];
    } else if (maxSpeed <= 5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '50%', stopColor: '#74FA59' },
        { offset: '100%', stopColor: '#65B626' } // Green for 5 knots
      ];
    } else if (maxSpeed <= 8.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '33%', stopColor: '#74FA59' },
        { offset: '66%', stopColor: '#65B626' },
        {offset:"100%", stopColor:"#ffd700"} // jaune for 8.5 knots
      ];
    } else if (maxSpeed <= 13.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '25%', stopColor: '#74FA59' },
        { offset: '50%', stopColor: '#65B626' },
        {offset:"75%", stopColor:"#ffd700"},
        {offset:"100%", stopColor:"#ff8c00"} // orange pour 13.5 knots
      ];
    }else if (maxSpeed <= 19.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '20%', stopColor: '#74FA59' },
        { offset: '40%', stopColor: '#65B626' },
        {offset:"60%", stopColor:"#ffd700"},
        {offset:"80%", stopColor:"#ff8c00"} ,
        {offset:"100%" ,stopColor:"#FB3535"} // rouge pour 19.5 knots
      ];
    }else if (maxSpeed <= 24.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '16.6%', stopColor: '#74FA59' },
        { offset: '33.2%', stopColor: '#65B626' },
        {offset:"50%", stopColor:"#ffd700"},
        {offset:"66.4%", stopColor:"#ff8c00"} ,
        {offset:"83%" ,stopColor:"#FB3535"},
        {offset:"100%", stopColor:"#B7273F"} // rose pour 24.5knots
      ];
    }else if (maxSpeed <= 30.5) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '14.3%', stopColor: '#74FA59' },
        { offset: '28.6%', stopColor: '#65B626' },
        {offset:"42.5%", stopColor:"#ffd700"},
        {offset:"57%", stopColor:"#ff8c00"} ,
        {offset:"71.3%" ,stopColor:"#FB3535"},
        {offset:"86%", stopColor:"#B7273F"},
        {offset:"100%" , stopColor:"#8C27B7"} // violet pour 30.5 knots
      ];
    }else if (maxSpeed <= 37) {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '12.5%', stopColor: '#74FA59' },
        { offset: '25%', stopColor: '#65B626' },
        {offset:"37.5%", stopColor:"#ffd700"},
        {offset:"50%", stopColor:"#ff8c00"} ,
        {offset:"62.5%" ,stopColor:"#FB3535"},
        {offset:"75%", stopColor:"#B7273F"},
        {offset:"87.5%" , stopColor:"#8C27B7"},
        {offset:"100%" ,stopColor:"#3827B7"}// Bleu foncé 37 knots
      ];
    }else if (maxSpeed <= 44) {
      return [
       { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '10%', stopColor: '#74FA59' },
        { offset: '20%', stopColor: '#65B626' },
        {offset:"30%", stopColor:"#ffd700"},
        {offset:"40%", stopColor:"#ff8c00"} ,
        {offset:"50%" ,stopColor:"#FB3535"},
        {offset:"60%", stopColor:"#B7273F"},
        {offset:"70%" , stopColor:"#8C27B7"},
        {offset:"80%" ,stopColor:"#3827B7"},
        {offset:"90%", stopColor:"#02010D"} ,
        {offset:"100%", stopColor:"#FB3535"}//   rouge vif 44 knots
      ];
    }
    else {
      return [
        { offset: '0%', stopColor: '#4CD8E4' },
        { offset: '9.1%', stopColor: '#74FA59' },
        { offset: '18.2%', stopColor: '#65B626' },
        {offset:"27.3%", stopColor:"#ffd700"},
        {offset:"36.4%", stopColor:"#ff8c00"} ,
        {offset:"45.5%" ,stopColor:"#FB3535"},
        {offset:"54.6%", stopColor:"#B7273F"},
        {offset:"63.7%" , stopColor:"#8C27B7"},
        {offset:"72.9" ,stopColor:"#3827B7"},
        {offset:"82%", stopColor:"#02010D"} ,
        {offset:"91.1%", stopColor:"#FB3535"},
        {offset:"100%", stopColor:"#0D0505"} // noir
      ];
    }
  };
  
  // Inside your component:
const maxSpeed = Math.max(...transformedData.map(d => d.windSpeed));
const maxGust = Math.max(...transformedData.map(d => d.windGusts));

const gradientStops = getGradientForMaxSpeed(maxSpeed);
const gradientGustStops = getGradientForMaxSpeed(maxGust);

  return (
    <div className="chart-container">
    <ResponsiveContainer width={1500} height={500}> {/* Largeur plus grande que 100% pour permetre le défilement */}
      <ComposedChart 
        data={transformedData} 
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
         <defs>
    <linearGradient id="windGradient" x1="0" y1="1" x2="0" y2="0">
      {gradientStops.map((stop, index) => (
        <stop key={index} offset={stop.offset} stopColor={stop.stopColor} />
      ))}
    </linearGradient>
    
    <linearGradient id="gustGradient" x1="0" y1="1" x2="0" y2="0">
      {gradientGustStops.map((stop, index) => (
        <stop key={index} offset={stop.offset} stopColor={stop.stopColor} />
      ))}
    </linearGradient>
  </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="time"
          label={{ value: 'Heures', position: 'insideBottomRight', offset: 0 }} 
          tick={{ fontSize: 12, angle: -45 }} // Réduire la taille de la police et rotation des ticks

          interval={3} // Forcer l'affichage de tous les ticks
          xAxisId="time"  // Identifiant pour cet axe

        />
        <YAxis 
          label={{ value: 'Vitesse du vent (nœuds)', angle: -90, position: 'insideBottomLeft' }} 
          // domain={[0, 50]} // Fixer l'axe des Y entre 0 et 50
        />

            {/* Axe Y à droite pour les précipitations */}
            <YAxis 
          yAxisId="right" 
          orientation="right" 
          label={{ value: 'Précipitations (mm)', angle: -90, position: 'insideRight' }} 
        />
        <Tooltip 
       
       labelFormatter={(label) => {
        return !isNaN(label) ? `${label}h` : label; // Ajoute "h" seulement si le label est un nombre
      }}
        formatter={(value, name, props) => {
    if (name === 'windSpeed') {
      return [`${value} noeuds`, 'Vitesse du vent'];
    } else if (name === 'rain') {
      return [`${value} mm`, 'Précipitations'];
    } else if (name === 'windGusts') {
      return [`${value} noeuds`, 'Rafales'];
    }  else if (name === 'time') {
      return [`${value} h`, 'Rafales'];
    }  
    return value; // Default return value if not matched
  }} />
        {/* <Legend /> */}
        
        <Area 
          type="monotone" 
          dataKey="windSpeed" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#windGradient)" // Utiliser le même dégradé pour windSpeed
          xAxisId="time"  // Utilisation de l'axe 'time'

        />
        <Line 
          type="monotone" 
          dataKey="windGusts" 
          stroke="url(#gustGradient)" // Couleur de la ligne des rafales
          strokeWidth={2}
          dot={false} // Désactiver les points sur la ligne
          width={'30px'}
          xAxisId="time"  // Utilisation de l'axe 'time'

        />

        <Bar
        
          dataKey="rain"
          yAxisId="right"
          xAxisId="time"
          fill="#303C6D"
          barSize={5} // Ajustez cette valeur selon vos besoins
          />
       {/* Deuxième XAxis pour la direction du vent */}
       <XAxis
          dataKey="windDirection" // Utilisation de la direction du vent pour cette XAxis
          axisLine={false}
          tickLine={false}
          interval={0} // Afficher toutes les directions
          height={50} // Ajuster la hauteur de l'axe
          tick={renderWindDirectionTicks} // Utiliser notre fonction personnalisée pour les ticks
          xAxisId="windDirection"  // Identifiant pour cet axe
          orientation="bottom"     // Position de l'axe en bas
        />
      </ComposedChart>
      {/* Ce composant n'est plus utilisé */}
      {/* <WindDirection windDirectionData = {transformedData}></WindDirection> */}

    </ResponsiveContainer>
    </div>
  );
};

export default WindChart;
