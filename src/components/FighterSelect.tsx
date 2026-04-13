import React, { useRef, useState } from 'react';
import FighterBody from './FighterBody';

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
  playerNumber: number;
  onFaceUpload: (imageData: string) => void;
  onNameChange: (name: string) => void;
  onBodyTypeChange: (bodyType: Fighter['bodyType']) => void;
  onStanceChange: (stance: Fighter['stance']) => void;
  isReady: boolean;
  onToggleReady: () => void;
}

const FighterSelect: React.FC<Props> = ({
  fighter,
  playerNumber,
  onFaceUpload,
  onNameChange,
  onBodyTypeChange,
  onStanceChange,
  isReady,
  onToggleReady
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const accentColor = playerNumber === 1 ? '#00f0ff' : '#ff00aa';

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onFaceUpload(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const bodyTypes: Fighter['bodyType'][] = ['muscular', 'agile', 'heavy', 'balanced'];
  const stances: Fighter['stance'][] = ['offensive', 'defensive', 'special'];

  return (
    <div
      className="relative p-4 md:p-6 rounded-lg"
      style={{
        background: `linear-gradient(135deg, ${accentColor}10 0%, transparent 50%, ${accentColor}05 100%)`,
        border: `2px solid ${accentColor}40`,
        '--color': accentColor
      } as React.CSSProperties}
    >
      {/* Player Label */}
      <div className="absolute -top-3 left-4 md:left-6 px-3 md:px-4 py-1 bg-[#0a0a12]"
           style={{ border: `2px solid ${accentColor}` }}>
        <span className="text-xs md:text-sm font-bold tracking-[0.2em]"
              style={{ fontFamily: "'Orbitron', monospace", color: accentColor }}>
          PLAYER {playerNumber}
        </span>
      </div>

      {/* Name Input */}
      <div className="mt-4 mb-6">
        <input
          type="text"
          value={fighter.name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="ENTER NAME"
          maxLength={12}
          className="w-full bg-transparent border-b-2 py-2 text-xl md:text-2xl font-black tracking-wider text-center outline-none transition-colors"
          style={{
            fontFamily: "'Black Ops One', system-ui",
            borderColor: `${accentColor}60`,
            color: accentColor
          }}
        />
      </div>

      {/* Fighter Display - Body with Face */}
      <div className="relative mb-6">
        <div
          className="relative mx-auto w-full max-w-[280px] aspect-[3/4] rounded-lg overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at center, ${accentColor}20 0%, transparent 70%)`,
            border: `3px solid ${accentColor}50`
          }}
        >
          {/* Fighter Body with Face */}
          <FighterBody
            bodyType={fighter.bodyType}
            stance={fighter.stance}
            faceImage={fighter.faceImage}
            accentColor={accentColor}
            playerNumber={playerNumber}
          />

          {/* Upload Overlay when no face */}
          {!fighter.faceImage && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragging ? 'bg-white/20' : 'bg-black/40 hover:bg-black/30'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-dashed flex items-center justify-center mb-3"
                   style={{ borderColor: accentColor }}>
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke={accentColor}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-xs md:text-sm font-bold tracking-wider text-center px-4"
                 style={{ fontFamily: "'Orbitron', monospace", color: accentColor }}>
                {isDragging ? 'DROP YOUR FACE!' : 'UPLOAD YOUR FACE'}
              </p>
              <p className="text-[10px] text-white/40 mt-1">Click or drag image</p>
            </div>
          )}

          {/* Change Face button when face exists */}
          {fighter.faceImage && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold tracking-wider bg-black/70 hover:bg-black/90 transition-colors rounded"
              style={{ fontFamily: "'Orbitron', monospace", color: accentColor }}
            >
              CHANGE FACE
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Body Type Selection */}
      <div className="mb-4">
        <label className="block text-[10px] md:text-xs tracking-[0.2em] mb-2 text-white/50"
               style={{ fontFamily: "'Orbitron', monospace" }}>
          BODY TYPE
        </label>
        <div className="grid grid-cols-4 gap-1 md:gap-2">
          {bodyTypes.map((bt) => (
            <button
              key={bt}
              onClick={() => onBodyTypeChange(bt)}
              className={`py-2 md:py-2.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase transition-all ${
                fighter.bodyType === bt
                  ? 'text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
              style={{
                fontFamily: "'Orbitron', monospace",
                background: fighter.bodyType === bt ? accentColor : undefined,
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
              }}
            >
              {bt === 'muscular' ? 'POWER' : bt === 'agile' ? 'SPEED' : bt === 'heavy' ? 'TANK' : 'BALANCE'}
            </button>
          ))}
        </div>
      </div>

      {/* Stance Selection */}
      <div className="mb-6">
        <label className="block text-[10px] md:text-xs tracking-[0.2em] mb-2 text-white/50"
               style={{ fontFamily: "'Orbitron', monospace" }}>
          STANCE
        </label>
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {stances.map((st) => (
            <button
              key={st}
              onClick={() => onStanceChange(st)}
              className={`py-2 md:py-2.5 text-[9px] md:text-[10px] font-bold tracking-wider uppercase transition-all ${
                fighter.stance === st
                  ? 'text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
              style={{
                fontFamily: "'Orbitron', monospace",
                background: fighter.stance === st ? accentColor : undefined,
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
              }}
            >
              {st === 'offensive' ? 'ATTACK' : st === 'defensive' ? 'DEFEND' : 'SPECIAL'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-2">
        {Object.entries(fighter.stats).map(([stat, value]) => (
          <div key={stat}>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="uppercase tracking-wider text-white/50" style={{ fontFamily: "'Orbitron', monospace" }}>
                {stat}
              </span>
              <span style={{ color: accentColor, fontFamily: "'Orbitron', monospace" }}>{value}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${value}%`,
                  background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)`
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Ready Button */}
      <button
        onClick={onToggleReady}
        className={`w-full py-3 md:py-4 text-sm md:text-base font-black tracking-[0.2em] transition-all ${
          isReady
            ? 'bg-gradient-to-r from-green-500 to-green-400 text-black'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
        style={{
          fontFamily: "'Black Ops One', system-ui",
          clipPath: 'polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)',
          boxShadow: isReady ? '0 0 20px rgba(34,197,94,0.5)' : 'none'
        }}
      >
        {isReady ? '✓ READY!' : 'LOCK IN'}
      </button>
    </div>
  );
};

export default FighterSelect;