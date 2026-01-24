"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
    message: string;
    visible: boolean;
    hint?: string;
    onClose?: () => void;
}

export function Toast({ message, visible, hint, onClose }: ToastProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, x: 0 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="fixed top-20 right-[20%] z-[100] pointer-events-auto"
                    onClick={onClose}
                >
                    <div
                        className="relative cursor-pointer hover:scale-105 transition-transform"
                        style={{
                            backgroundColor: '#212121',
                            border: '2px solid white',
                            boxShadow: '0 0 0 4px #212121, 0 0 0 6px white, 0 8px 16px rgba(0,0,0,0.5)',
                            padding: '8px 12px', // Reduced padding
                            borderRadius: '4px',
                            minWidth: '240px', // Reduced width
                            maxWidth: '320px',
                        }}
                    >
                        <div className="flex items-start gap-3">
                            {/* Minecraft-style trophy icon */}
                            <div
                                className="text-2xl flex-shrink-0 mt-0.5" // Reduced icon size
                                style={{
                                    filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))',
                                    color: '#FFD700'
                                }}
                            >
                                🏆
                            </div>
                            <div className="flex-1 min-w-0">
                                <p
                                    className="font-bold text-base tracking-wide leading-tight" // Reduced text size
                                    style={{ color: '#FFFF55' }}
                                >
                                    Advancement Made!
                                </p>
                                <p
                                    className="text-sm text-white tracking-wide leading-tight mb-1" // Reduced text size
                                    style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                                >
                                    {message}
                                </p>
                                {hint && (
                                    <div className="border-t border-white/20 pt-1 mt-1">
                                        <p
                                            className="text-xs text-gray-300 italic leading-tight" // Reduced text size
                                        >
                                            {hint}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
