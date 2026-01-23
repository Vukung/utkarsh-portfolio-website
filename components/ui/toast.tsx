"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
    message: string;
    visible: boolean;
    onClose?: () => void;
}

export function Toast({ message, visible, onClose }: ToastProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: 100, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed top-40 right-6 z-[100] pointer-events-auto"
                    onClick={onClose}
                >
                    <div
                        className="relative cursor-pointer hover:scale-105 transition-transform"
                        style={{
                            backgroundColor: '#212121',
                            border: '2px solid white',
                            boxShadow: '0 0 0 4px #212121, 0 0 0 6px white, 0 8px 16px rgba(0,0,0,0.5)',
                            padding: '16px 20px',
                            borderRadius: '4px',
                            minWidth: '280px',
                        }}
                    >
                        <div className="flex items-start gap-3 font-vt323">
                            {/* Minecraft-style trophy icon */}
                            <div
                                className="text-3xl flex-shrink-0 mt-1"
                                style={{
                                    filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))',
                                    color: '#FFD700'
                                }}
                            >
                                🏆
                            </div>
                            <div className="flex-1">
                                <p
                                    className="font-bold text-lg tracking-wide mb-1"
                                    style={{ color: '#FFFF55' }}
                                >
                                    Achievement Get!
                                </p>
                                <p
                                    className="text-base text-white tracking-wide"
                                    style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                                >
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
