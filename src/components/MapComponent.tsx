import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MapComponentProps = {
  handleChange: (lat: number, lng: number) => void;
  address: string;
  defaultLatitude?: number;
  defaultLongitude?: number;
};

const MapComponent: React.FC<MapComponentProps> = ({
  handleChange,
  address,
  defaultLatitude,
  defaultLongitude,
}) => {
  const [clickedPosition, setClickedPosition] = useState<
    [number, number] | null
  >(null);

  const handleClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setClickedPosition([lat, lng]);
    handleChange(lat, lng);
  };

  useEffect(() => {
    console.log("nooope:" + defaultLatitude + " " + defaultLongitude);
    if (defaultLatitude && defaultLongitude) {
      console.log(defaultLatitude, defaultLongitude);
      
      setClickedPosition([defaultLatitude, defaultLongitude]);
      handleChange(defaultLatitude, defaultLongitude);
    }
  }, [defaultLatitude, defaultLongitude, handleChange]);

  return (
    <div className="w-full h-48">
      <MapContainer
        className="overflow-hidden w-full h-full"
        center={[36.84516134919111, 10.270184661572289]}
        zoom={12}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {clickedPosition && (
          <Marker position={clickedPosition} autoPan={true}>
            <Popup>{address}</Popup>
          </Marker>
        )}
        <MapEventComponent onClick={handleClick} />
      </MapContainer>
    </div>
  );
};

const MapEventComponent: React.FC<{ onClick: (e: any) => void }> = ({
  onClick,
}) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};

export default MapComponent;
