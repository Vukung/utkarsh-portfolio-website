"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Clock, MapPin, Minus, Plus, Thermometer } from "lucide-react";
import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

// Custom marker icon
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
});

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
    const position: [number, number] = [
        personalInfo.coordinates.lat,
        personalInfo.coordinates.lng,
    ];

    return (
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border border-border/50 shadow-lg">
            {/* Map container - Full width */}
            <MapContainer
                center={position}
                zoom={12}
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
                {/* Dark theme tile layer from CartoDB */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* Location marker */}
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        <div className="text-sm">
                            <strong>{personalInfo.location}</strong>
                            <br />
                            <span className="text-xs text-gray-600">
                                {personalInfo.coordinates.lat.toFixed(4)}, {personalInfo.coordinates.lng.toFixed(4)}
                            </span>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Airplane animation */}
            <motion.div
                className="absolute z-[1000]"
                initial={{ x: "10%", y: "20%" }}
                animate={{
                    x: ["10%", "80%"],
                    y: ["20%", "30%", "40%", "25%"],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-blue-400 drop-shadow-lg"
                >
                    <path
                        d="M22 16.21V11.5C22 10.12 21.12 9 20 9H16L14 4H13L14 9H8L7 7H6L6.5 9H4C2.9 9 2 9.9 2 11V16.21C2 16.76 2.46 17.21 3 17.21C3.15 17.21 3.29 17.17 3.42 17.11L6 16L8.58 17.11C8.71 17.17 8.85 17.21 9 17.21C9.15 17.21 9.29 17.17 9.42 17.11L12 16L14.58 17.11C14.71 17.17 14.85 17.21 15 17.21C15.15 17.21 15.29 17.17 15.42 17.11L18 16L20.58 17.11C20.71 17.17 20.85 17.21 21 17.21C21.54 17.21 22 16.76 22 16.21Z"
                        fill="currentColor"
                    />
                </svg>
            </motion.div>

            {/* Location info overlay - Bottom left */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-gray-900/90 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-700/50 shadow-xl">
                <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-200">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-200">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono">{currentTime}</span>
                    </div>
                    {temperature !== null && (
                        <div className="flex items-center gap-2 text-gray-200">
                            <Thermometer className="w-4 h-4" />
                            <span>{temperature}°C · {weatherCondition}</span>
                        </div>
                    )}
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
