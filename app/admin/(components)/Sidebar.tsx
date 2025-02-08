"use client";

import { useState } from "react";
import { Home, User, Settings } from "lucide-react";

const navItems = [
    { label: "Home", icon: Home },
    { label: "Profile", icon: User },
    { label: "Settings", icon: Settings },
];

export function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div
            className={`transition-all duration-300 bg-gray-800 text-white ${isExpanded ? "w-64" : "w-20"
                } h-screen flex flex-col`}
        >
            <button
                className="p-4 bg-gray-700 hover:bg-gray-600"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? "Collapse" : "Expand"}
            </button>
            <nav className="flex-1 mt-4">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center p-4 hover:bg-gray-600 cursor-pointer"
                    >
                        <item.icon className="mr-4" />
                        {isExpanded && <span>{item.label}</span>}
                    </div>
                ))}
            </nav>
        </div>
    );
}
