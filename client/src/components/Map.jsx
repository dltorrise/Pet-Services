import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

const cities = [
  {
    name: "Chicago", 
    lat: 41.9341235,
    lng: -87.7783599,
    pins: [
      { lat: 41.9341235, lng: -87.7783599 },
      { lat: 42, lng: -87.7783599 },
    ],
  },
  {
    name: "Evanston",
    lat: 42.045585,
    lng: -87.7404359,
    pins: [
      { lat: 41.5341235, lng: -87.5783599 },
      { lat: 42.1, lng: -86.7783599 },
    ],
  },
];

const MapPin = ({ text }) => (
  <div>
    {text}
    <FaMapMarkerAlt />
  </div>
);

export default function SimpleMap() {
  const [city, setCity] = useState(cities[0]);

  const defaultProps = {
    center: {
      lat: city.lat,
      lng: city.lng,
    },
    zoom: 8,
  };

  return (
    // Important! Always set the container height explicitly
    <div>
      <select
        onChange={(event) => {
          setCity(cities[event.target.value]);
        }}
      >
        {cities.map((city, i) => (
          <option value={i}>{city.name}</option>
        ))}
        {
        /* 
        <option value="0">Chicago</option>
        <option value="1">Evanston</option>
        */}
      </select>

      <div style={{ height: "60vh", width: "200%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAa7Fs6zs5me7OX3Fx-K5cD9RYAxnHFw6Q" }}
          center={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {city.pins.map((pin) => (
            <MapPin lat={pin.lat} lng={pin.lng} />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
}
