import React from 'react';

interface Props {
  bodyType: 'muscular' | 'agile' | 'heavy' | 'balanced';
  stance: 'offensive' | 'defensive' | 'special';
  faceImage: string | null;
  accentColor: string;
  playerNumber: number;
}

const FighterBody: React.FC<Props> = ({ bodyType, stance, faceImage, accentColor, playerNumber }) => {
  // Face position adjustments based on stance
  const facePositions = {
    offensive: { top: '8%', left: '50%', size: '28%', rotation: playerNumber === 1 ? -5 : 5 },
    defensive: { top: '10%', left: '50%', size: '26%', rotation: 0 },
    special: { top: '6%', left: '50%', size: '30%', rotation: playerNumber === 1 ? 10 : -10 }
  };

  const facePos = facePositions[stance];

  // Body dimensions based on type
  const bodyStyles = {
    muscular: { shoulderWidth: 140, chestWidth: 120, armWidth: 28, legWidth: 32 },
    agile: { shoulderWidth: 100, chestWidth: 90, armWidth: 18, legWidth: 24 },
    heavy: { shoulderWidth: 160, chestWidth: 150, armWidth: 35, legWidth: 40 },
    balanced: { shoulderWidth: 120, chestWidth: 110, armWidth: 22, legWidth: 28 }
  };

  const body = bodyStyles[bodyType];
  const flip = playerNumber === 2;

  // Stance-based arm and leg positions
  const stancePoses = {
    offensive: {
      leftArm: { rotate: -45, translateX: -20, translateY: -10 },
      rightArm: { rotate: 60, translateX: 30, translateY: -40 },
      leftLeg: { rotate: -15, translateX: 0 },
      rightLeg: { rotate: 25, translateX: 10 }
    },
    defensive: {
      leftArm: { rotate: -30, translateX: -10, translateY: 20 },
      rightArm: { rotate: 30, translateX: 10, translateY: 20 },
      leftLeg: { rotate: -5, translateX: -5 },
      rightLeg: { rotate: 5, translateX: 5 }
    },
    special: {
      leftArm: { rotate: -120, translateX: -40, translateY: -60 },
      rightArm: { rotate: 120, translateX: 40, translateY: -60 },
      leftLeg: { rotate: -30, translateX: -10 },
      rightLeg: { rotate: 30, translateX: 10 }
    }
  };

  const pose = stancePoses[stance];

  return (
    <div className="relative w-full h-full" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      {/* Energy aura effect */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${accentColor}40 0%, transparent 60%)`,
          animation: 'pulse 2s ease-in-out infinite'
        }}
      />

      {/* SVG Fighter Body */}
      <svg
        viewBox="0 0 200 300"
        className="absolute inset-0 w-full h-full"
        style={{ filter: `drop-shadow(0 0 10px ${accentColor}50)` }}
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id={`bodyGrad-${playerNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id={`skinGrad-${playerNumber}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8c4a0" />
            <stop offset="100%" stopColor="#d4a574" />
          </linearGradient>
          <filter id={`glow-${playerNumber}`}>
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left Leg */}
        <g transform={`translate(${70 + pose.leftLeg.translateX}, 200) rotate(${pose.leftLeg.rotate})`}>
          <rect
            x={-body.legWidth / 2}
            y="0"
            width={body.legWidth}
            height="80"
            rx="8"
            fill={`url(#bodyGrad-${playerNumber})`}
            stroke={accentColor}
            strokeWidth="2"
          />
          {/* Knee detail */}
          <ellipse cx="0" cy="35" rx={body.legWidth / 3} ry="6" fill={accentColor} opacity="0.5" />
          {/* Boot */}
          <rect
            x={-body.legWidth / 2 - 2}
            y="70"
            width={body.legWidth + 4}
            height="15"
            rx="4"
            fill="#1a1a2e"
            stroke={accentColor}
            strokeWidth="1"
          />
        </g>

        {/* Right Leg */}
        <g transform={`translate(${130 + pose.rightLeg.translateX}, 200) rotate(${pose.rightLeg.rotate})`}>
          <rect
            x={-body.legWidth / 2}
            y="0"
            width={body.legWidth}
            height="80"
            rx="8"
            fill={`url(#bodyGrad-${playerNumber})`}
            stroke={accentColor}
            strokeWidth="2"
          />
          <ellipse cx="0" cy="35" rx={body.legWidth / 3} ry="6" fill={accentColor} opacity="0.5" />
          <rect
            x={-body.legWidth / 2 - 2}
            y="70"
            width={body.legWidth + 4}
            height="15"
            rx="4"
            fill="#1a1a2e"
            stroke={accentColor}
            strokeWidth="1"
          />
        </g>

        {/* Torso */}
        <path
          d={`
            M ${100 - body.shoulderWidth / 2} 90
            Q ${100 - body.chestWidth / 2 - 10} 140, ${100 - body.chestWidth / 2 + 10} 200
            L ${100 + body.chestWidth / 2 - 10} 200
            Q ${100 + body.chestWidth / 2 + 10} 140, ${100 + body.shoulderWidth / 2} 90
            Q 100 80, ${100 - body.shoulderWidth / 2} 90
          `}
          fill={`url(#bodyGrad-${playerNumber})`}
          stroke={accentColor}
          strokeWidth="2"
          filter={`url(#glow-${playerNumber})`}
        />

        {/* Chest details */}
        <ellipse cx="80" cy="120" rx="15" ry="20" fill={accentColor} opacity="0.3" />
        <ellipse cx="120" cy="120" rx="15" ry="20" fill={accentColor} opacity="0.3" />

        {/* Abs */}
        <rect x="90" y="145" width="20" height="12" rx="3" fill={accentColor} opacity="0.2" />
        <rect x="90" y="162" width="20" height="12" rx="3" fill={accentColor} opacity="0.2" />
        <rect x="90" y="179" width="20" height="12" rx="3" fill={accentColor} opacity="0.15" />

        {/* Left Arm */}
        <g transform={`translate(${100 - body.shoulderWidth / 2 + pose.leftArm.translateX}, ${90 + pose.leftArm.translateY}) rotate(${pose.leftArm.rotate})`}>
          {/* Upper arm */}
          <rect
            x={-body.armWidth / 2}
            y="0"
            width={body.armWidth}
            height="50"
            rx="10"
            fill={`url(#bodyGrad-${playerNumber})`}
            stroke={accentColor}
            strokeWidth="2"
          />
          {/* Lower arm */}
          <rect
            x={-body.armWidth / 2 + 2}
            y="48"
            width={body.armWidth - 4}
            height="45"
            rx="8"
            fill={`url(#bodyGrad-${playerNumber})`}
            stroke={accentColor}
            strokeWidth="2"
          />
          {/* Fist */}
          <ellipse
            cx="0"
            cy="100"
            rx={body.armWidth / 2 + 4}
            ry={body.armWidth / 2 + 2}
            fill={`url(#skinGrad-${playerNumber})`}
            stroke={accentColor}
            strokeWidth="1"
          />
        </g>

        {/* Right Arm */}
        <g transform={`translate(${100 + body.shoulderWidth / 2 + pose.rightArm.translateX}, ${90 + pose.rightArm.translateY}) rotate(${pose.rightArm.rotate})`}>
          <rect
            x={-body.armWidth / 2}
            y="0"
            width={body.armWidth}
            height="50"
            rx="10"
            fill={`url(#bodyGrad-${playerNumber})`}
            stroke={accentColor}
            strokeWidth="2"
          />
          <rect
            x={-body.armWidth / 2 + 2}
            y="48"
            width={body.armWidth - 4}
            height="45"
            rx="8"
            fill={`url(#bodyGrad-${playerNumber})`}
            stroke={accentColor}
            strokeWidth="2"
          />
          <ellipse
            cx="0"
            cy="100"
            rx={body.armWidth / 2 + 4}
            ry={body.armWidth / 2 + 2}
            fill={`url(#skinGrad-${playerNumber})`}
            stroke={accentColor}
            strokeWidth="1"
          />
        </g>

        {/* Neck */}
        <rect
          x="85"
          y="60"
          width="30"
          height="35"
          rx="10"
          fill={`url(#skinGrad-${playerNumber})`}
          stroke={accentColor}
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Head base (behind face image) */}
        <ellipse
          cx="100"
          cy="45"
          rx="35"
          ry="40"
          fill={`url(#skinGrad-${playerNumber})`}
          stroke={accentColor}
          strokeWidth="2"
        />

        {/* Hair/Helmet */}
        <path
          d={`
            M 65 45
            Q 65 10, 100 5
            Q 135 10, 135 45
            Q 130 35, 100 32
            Q 70 35, 65 45
          `}
          fill="#1a1a2e"
          stroke={accentColor}
          strokeWidth="2"
        />
      </svg>

      {/* Face Image Overlay */}
      {faceImage && (
        <div
          className="absolute overflow-hidden"
          style={{
            top: facePos.top,
            left: facePos.left,
            width: facePos.size,
            aspectRatio: '1',
            transform: `translateX(-50%) rotate(${facePos.rotation}deg) ${flip ? 'scaleX(-1)' : ''}`,
            borderRadius: '50%',
            border: `3px solid ${accentColor}`,
            boxShadow: `0 0 15px ${accentColor}80`
          }}
        >
          <img
            src={faceImage}
            alt="Fighter face"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
        </div>
      )}

      {/* Energy particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: accentColor,
              left: `${20 + Math.random() * 60}%`,
              top: `${30 + Math.random() * 40}%`,
              animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: `0 0 6px ${accentColor}`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 0.3; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default FighterBody;