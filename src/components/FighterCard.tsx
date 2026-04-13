import React from 'react';

interface Fighter {
  id: number;
  name: string;
  faceImage: string | null;
  bodyType: 'muscular' | 'agile' | 'heavy' | 'balanced';
  stance: 'offensive' | 'defensive' | 'special';
  primaryColor: string;
  stats: {
    power: number;
    speed: number;
    defense: number;
    special: number;
  };
}

interface Props {
  fighter: Fighter;
}

const FighterCard: React.FC<Props> = ({ fighter }) => {
  return (
    <div
      className="relative p-4 rounded-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${fighter.primaryColor}20 0%, transparent 100%)`,
        border: `2px solid ${fighter.primaryColor}60`
      }}
    >
      <h3
        className="text-lg font-bold tracking-wider"
        style={{ fontFamily: "'Black Ops One', system-ui", color: fighter.primaryColor }}
      >
        {fighter.name}
      </h3>
      <p className="text-xs text-white/50 uppercase tracking-wider mt-1" style={{ fontFamily: "'Orbitron', monospace" }}>
        {fighter.bodyType} • {fighter.stance}
      </p>
    </div>
  );
};

export default FighterCard;