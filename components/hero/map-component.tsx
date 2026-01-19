"use client";

import { personalInfo } from "@/lib/data";
import "leaflet/dist/leaflet.css";
import { Clock, MapPin, Minus, Plus, Thermometer } from "lucide-react";
import { useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

// Pulsating dot styles
const pulseStyle = {
    animation: "pulse 2s ease-in-out infinite",
};

// Add keyframes for pulse animation
if (typeof window !== "undefined" && !document.getElementById("pulse-keyframes")) {
    const style = document.createElement("style");
    style.id = "pulse-keyframes";
    style.textContent = `
        @keyframes pulse {
            0%, 100% { 
                opacity: 1;
            }
            50% { 
                opacity: 0.4;
            }
        }
        .pulsating-marker {
            animation: pulse 2s ease-in-out infinite;
        }
        .map-tiles-invert {
            filter: invert(1) contrast(1.2) brightness(0.4);
        }
    `;
    document.head.appendChild(style);
}

// ... (previous imports)
import L from "leaflet";
import { useMap } from "react-leaflet";

// ... (pulse style and keyframes)

interface MapComponentProps {
    currentTime: string;
    temperature: number | null;
    weatherCondition: string | null;
}

// Custom Zoom Control Component
function CustomZoomControl() {
    const map = useMap();

    const handleZoomIn = () => {
        map.zoomIn();
    };

    const handleZoomOut = () => {
        map.zoomOut();
    };

    return null; // We'll render controls outside the MapContainer
}

export default function MapComponent({ currentTime, temperature, weatherCondition }: MapComponentProps) {
    const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

    // Marker position - exact coordinates
    const position: [number, number] = [
        personalInfo.coordinates.lat,
        personalInfo.coordinates.lng,
    ];

    // Map center - exact coordinates to keep marker in center
    const mapCenter: [number, number] = [
        personalInfo.coordinates.lat,
        personalInfo.coordinates.lng,
    ];

    return (
        <div className="relative w-full overflow-x-hidden">
            {/* Map container */}
            <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden border-2 border-primary/20 shadow-xl shadow-primary/5">
                {/* Map container - Full width */}
                <MapContainer
                    center={mapCenter}
                    zoom={11.5}
                    minZoom={1}
                    maxZoom={18}
                    scrollWheelZoom={true}
                    zoomControl={false}
                    dragging={true}
                    doubleClickZoom={true}
                    className="w-full h-full"
                    style={{ background: "#1a1a1a" }}
                    ref={setMapInstance}
                >
                    {/* Dark tiles with brightness boost for visible roads */}
                    <TileLayer
                        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        className="map-tiles-bright"
                    />

                    {/* Location marker - Pulsating blue dot */}
                    <CircleMarker
                        center={position}
                        radius={6}
                        pathOptions={{
                            fillColor: "#8a8ac5ff",
                            fillOpacity: 0.8,
                            color: "#60a5fa",
                            weight: 2,
                            className: "pulsating-marker"
                        }}
                    >
                        <Popup>
                            <div className="text-sm">
                                <strong>{personalInfo.location}</strong>
                                <br />
                                <span className="text-xs text-gray-600">
                                    {personalInfo.coordinates.lat.toFixed(4)}, {personalInfo.coordinates.lng.toFixed(4)}
                                </span>
                            </div>
                        </Popup>
                    </CircleMarker>
                </MapContainer>
            </div>

            {/* Airplane animation - COMMENTED OUT FOR LATER WORK */}
            {/* <motion.div
                className="absolute top-0 z-[1000] pointer-events-none"
                initial={{ left: "-100px", top: "30%" }}
                animate={{
                    left: "calc(100% + 100px)", // Travel completely across and off the right edge
                    top: "30%", // Straight horizontal path
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <img
                    src="/plane.webp"
                    alt="Flying airplane"
                    width={60}
                    height={60}
                    className="drop-shadow-2xl"
                    style={{ transform: 'rotate(90deg)' }}
                />
            </motion.div> */}

            {/* Location info overlay - Top Right - Transparent */}
            <div className="absolute top-4 right-4 z-[1000] px-2 py-1">
                <div className="flex flex-col gap-1 text-sm font-medium drop-shadow-md">
                    <div className="flex items-center gap-2 text-gray-200">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{currentTime}</span>
                    </div>
                    {/* {temperature !== null && (
                        <div className="flex items-center gap-2 text-gray-200">
                            <Thermometer className="w-4 h-4" />
                            <span>{temperature}°C · {weatherCondition}</span>
                        </div>
                    )} */}
                </div>
            </div>

            {/* Custom Modern Zoom Controls - Top left */}
            <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
                <button
                    onClick={() => mapInstance?.zoomIn()}
                    className="w-10 h-10 rounded-lg bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 shadow-xl flex items-center justify-center text-gray-200 hover:bg-gray-800/90 hover:text-white hover:border-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label="Zoom in"
                >
                    <Plus className="w-5 h-5" />
                </button>
                <button
                    onClick={() => mapInstance?.zoomOut()}
                    className="w-10 h-10 rounded-lg bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 shadow-xl flex items-center justify-center text-gray-200 hover:bg-gray-800/90 hover:text-white hover:border-gray-600 transition-all duration-200 hover:scale-105 active:scale-95"
                    aria-label="Zoom out"
                >
                    <Minus className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
