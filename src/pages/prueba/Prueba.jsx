import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const apiKey = "AIzaSyDSYOFTW7Hpil-9DFCvVOE6TPPbSQKuyPU";

const MapContainer = () => {
  const address = "Rivadavia 1333, Rio Grande Tierra del Fuego";
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(null);

  const getLocationFromAddress = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener las coordenadas");
      }

      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      setLocation({ lat, lng });
    } catch (error) {
      console.error("Error al obtener las coordenadas:", error);
      setError("No se pudo obtener la ubicación. Verifica la dirección.");
    }
  };

  useEffect(() => {
    getLocationFromAddress();
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={location}
        zoom={15}
      >
        {error ? <div>{error}</div> : <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
