import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const cities = [
  {
    name: "Chicago",
    lat: 41.9341235,
    lng: -87.7783599,
  },
  {
    name: "Evanston",
    lat: 42.045585,
    lng: -87.7404359,
  },
];

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
        {/* 
        <option value="0">Chicago</option>
        <option value="1">Evanston</option>
        */}
      </select>

      <div style={{ height: "50vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAa7Fs6zs5me7OX3Fx-K5cD9RYAxnHFw6Q" }}
          center={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
}
