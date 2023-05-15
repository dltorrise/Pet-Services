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
      { lat: 42.1675886, lng: -88.1816042 },
    ],
  },
  {
    name: "Evanston",
    lat: 42.045585,
    lng: -87.7404359,
    pins: [
      { lat: 42.045585, lng: -87.7404359 },
      { lat: 42.2458651, lng: -88.1538673 },
    ],
  },
  {
    name: "Skokie",
    lat: 42.0331964,
    lng: -87.8273143,
    pins: [
      { lat: 42.0331964, lng: -87.8273143 },
      { lat: 42.1, lng: -86.7783599 },
    ],
  },
  {
    name: "Glendale",
    lat: 41.9013443,
    lng: -88.0637552,
    pins: [
      { lat: 41.9013443, lng: -88.0637552 },
      { lat: 41.901382, lng: -88.133915 },
    ],
  },
  {
    name: "Arlington Heights",
    lat: 32.7425,
    lng: -97.3703,
    // pins: [
    //   // { lat: 46.423669, lng: 87.991257},
    //   // { lat:46.096153 , lng: -87.991257},
    // ],
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
    zoom: 7,
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

      <div ClassName="map" style={{ height: "40vh" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
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
