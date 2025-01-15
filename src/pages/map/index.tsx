import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import { useJob } from "../../common/hooks";

const CustomIcon = L.divIcon({
  className: "custom-icon",
  html: `<div style="
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 30px;
    ">📍</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

L.Marker.prototype.options.icon = CustomIcon;

const MapWithPins: React.FC = () => {
  const { allJobs, refetchAllJobs } = useJob();
  useEffect(() => {
    refetchAllJobs();
  }, [refetchAllJobs]);
  const center: [number, number] = [38.9072, -77.0369]; // Washington, D.C.
  return (
    <StyledMapContainer center={center} zoom={4}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {allJobs &&
        allJobs.map(
          (job, index) =>
            job.latitude &&
            job.longitude && (
              <Marker key={index} position={[job.latitude, job.longitude]}>
                <Popup>{job.companyName}</Popup>
              </Marker>
            )
        )}
    </StyledMapContainer>
  );
};

const StyledMapContainer = styled(MapContainer)`
  border-radius: 8px;
  height: 100% - 40px;
  width: 100%;
`;
export default MapWithPins;
