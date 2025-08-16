import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
    text, 
    disabled = false, 
    speed = 6, 
    className = '' 
}) => {
    return (
        <div
            className={`relative inline-block ${className}`}
            style={{
                background: disabled ? 'white' : 'linear-gradient(90deg, white 25%, #ffffff80 50%, white 75%)',
                backgroundSize: disabled ? '100% 100%' : '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                animation: disabled ? 'none' : `shine ${speed}s ease-in-out infinite`,
            }}
        >
            {text}
            <style jsx>{`
                @keyframes shine {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
};

export default ShinyText;