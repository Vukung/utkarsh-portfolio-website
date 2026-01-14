"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the map component (prevents SSR issues with Leaflet)
const MapComponent = dynamic(() => import("./map-component"), {
    ssr: false,
    loading: () => (
        <div className="w-full md:w-[400px] h-48 md:h-56 rounded-xl overflow-hidden border border-border/50 bg-gray-900 animate-pulse flex items-center justify-center">
            <span className="text-xs text-gray-500">Loading map...</span>
        </div>
    ),
});

export function LocationWidget() {
    const [currentTime, setCurrentTime] = useState("");
    const [temperature, setTemperature] = useState<number | null>(null);
    const [weatherCondition, setWeatherCondition] = useState("");

    useEffect(() => {
        // Update time every second
        const updateTime = () => {
            const time = new Intl.DateTimeFormat("en-US", {
                timeZone: personalInfo.timezone,
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }).format(new Date());
            setCurrentTime(time);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        // Fetch weather data (mock for now)
        const fetchWeather = () => {
            setTemperature(24);
            setWeatherCondition("Partly Cloudy");
        };

        fetchWeather();

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            <MapComponent
                currentTime={currentTime}
                temperature={temperature}
                weatherCondition={weatherCondition}
            />
        </motion.div>
    );
}
