"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { Clock, MapPin, Thermometer } from "lucide-react";
import { useEffect, useState } from "react";

// Simple airplane SVG animation
function FlyingAirplane() {
    return (
        <motion.div
            className="absolute"
            initial={{ x: "-10%", y: "30%" }}
            animate={{
                x: ["10%", "90%"],
                y: ["30%", "20%", "40%", "25%"],
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
            }}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-foreground/60"
            >
                <path
                    d="M22 16.21V11.5C22 10.12 21.12 9 20 9H16L14 4H13L14 9H8L7 7H6L6.5 9H4C2.9 9 2 9.9 2 11V16.21C2 16.76 2.46 17.21 3 17.21C3.15 17.21 3.29 17.17 3.42 17.11L6 16L8.58 17.11C8.71 17.17 8.85 17.21 9 17.21C9.15 17.21 9.29 17.17 9.42 17.11L12 16L14.58 17.11C14.71 17.17 14.85 17.21 15 17.21C15.15 17.21 15.29 17.17 15.42 17.11L18 16L20.58 17.11C20.71 17.17 20.85 17.21 21 17.21C21.54 17.21 22 16.76 22 16.21Z"
                    fill="currentColor"
                />
            </svg>
        </motion.div>
    );
}

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
                second: "2-digit",
                hour12: true,
            }).format(new Date());
            setCurrentTime(time);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        // Fetch weather data (you can use a real API like OpenWeatherMap)
        // For now, we'll use mock data
        // In production, you'd call: fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid={API_KEY}&units=metric`)
        const fetchWeather = () => {
            // Mock weather data - replace with real API call
            setTemperature(24);
            setWeatherCondition("Partly Cloudy");
        };

        fetchWeather();

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
        >
            {/* Static map with airplane */}
            <div className="relative w-32 h-24 rounded-lg overflow-hidden border border-border bg-muted">
                {/* Simple map representation - replace with actual static map image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950">
                    {/* Simple land masses representation */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-green-200 dark:bg-green-900 opacity-40" />
                </div>
                <FlyingAirplane />
            </div>

            {/* Location and weather info */}
            <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">{currentTime}</span>
                </div>
                {temperature !== null && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Thermometer className="w-4 h-4" />
                        <span>{temperature}°C · {weatherCondition}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
