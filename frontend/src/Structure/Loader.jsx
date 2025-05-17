import React from "react";

export default function Loader({ size = 96, dotSize = 8, dimand = 40, speed = 1.5 }) {
    const positions = [
        "translate(-50%, -50%) translateY(-1)",
    ];

    const radius = size / 2 - dotSize;

    const getTransform = (pos) => {
        const match = pos.match(/translate\(([^)]+)\) translate([XY])\((-?1)\)/);
        if (!match) return "translate(-50%, -50%)";
        const axis = match[2];
        const dir = parseFloat(match[3]);
        const x = axis === "X" ? radius * dir : 0;
        const y = axis === "Y" ? radius * dir : 0;
        return `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <style>
                {`
                    @keyframes diamondPath {
                        0% {
                            transform: translate(-50%, -50%) translateY(-${dimand}px);
                        }

                        25% {
                            transform: translate(-50%, -50%) translateX(${dimand}px);
                        }

                        50% {
                            transform: translate(-50%, -50%) translateY(${dimand}px);
                        }

                        75% {
                            transform: translate(-50%, -50%) translateX(-${dimand}px);
                        }

                        100% {
                            transform: translate(-50%, -50%) translateY(-${dimand}px);
                        }
                    }

                    .animate-diamond-path {
                        animation: diamondPath ${speed}s linear infinite;
                    }
                `}
            </style>
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute top-1/2 left-1/2 bg-black rounded-full animate-diamond-path"
                    style={{
                        width: dotSize,
                        height: dotSize,
                        animationDelay: `${(i * 1.5) / 6}s`,
                        animationFillMode: "both",
                        transform: getTransform(positions[i % positions.length]),
                    }}
                ></div>
            ))}
        </div>
    );
}
