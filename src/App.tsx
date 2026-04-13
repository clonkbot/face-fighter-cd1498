import React, { useState, useRef } from 'react';
import FighterCard from './components/FighterCard';
import FighterSelect from './components/FighterSelect';

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

const defaultFighters: Fighter[] = [
  {
    id: 1,
    name: 'PLAYER 1',
    faceImage: null,
    bodyType: 'muscular',
    stance: 'offensive',
    primaryColor: '#00f0ff',
    stats: { power: 85, speed: 60, defense: 70, special: 75 }
  },
  {
    id: 2,
    name: 'PLAYER 2',
    faceImage: null,
    bodyType: 'agile',
    stance: 'defensive',
    primaryColor: '#ff00aa',
    stats: { power: 60, speed: 90, defense: 55, special: 80 }
  }
];

function App() {
  const [fighters, setFighters] = useState<Fighter[]>(defaultFighters);
  const [selectedFighter, setSelectedFighter] = useState<number>(1);
  const [isReady, setIsReady] = useState<boolean[]>([false, false]);

  const handleFaceUpload = (fighterId: number, imageData: string) => {
    setFighters(prev => prev.map(f =>
      f.id === fighterId ? { ...f, faceImage: imageData } : f
    ));
  };

  const handleNameChange = (fighterId: number, name: string) => {
    setFighters(prev => prev.map(f =>
      f.id === fighterId ? { ...f, name: name.toUpperCase() } : f
    ));
  };

  const handleBodyTypeChange = (fighterId: number, bodyType: Fighter['bodyType']) => {
    const statsMap = {
      muscular: { power: 85, speed: 60, defense: 70, special: 75 },
      agile: { power: 60, speed: 90, defense: 55, special: 80 },
      heavy: { power: 75, speed: 40, defense: 95, special: 60 },
      balanced: { power: 70, speed: 70, defense: 70, special: 70 }
    };
    setFighters(prev => prev.map(f =>
      f.id === fighterId ? { ...f, bodyType, stats: statsMap[bodyType] } : f
    ));
  };

  const handleStanceChange = (fighterId: number, stance: Fighter['stance']) => {
    setFighters(prev => prev.map(f =>
      f.id === fighterId ? { ...f, stance } : f
    ));
  };

  const toggleReady = (index: number) => {
    const newReady = [...isReady];
    newReady[index] = !newReady[index];
    setIsReady(newReady);
  };

  const bothReady = isReady[0] && isReady[1];

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white overflow-x-hidden relative flex flex-col">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)'
           }}
      />

      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20"
           style={{
             backgroundImage: `
               linear-gradient(rgba(0,240,255,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,240,255,0.1) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px',
             animation: 'gridMove 20s linear infinite'
           }}
      />

      <style>{`
        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          75% { transform: translateX(2px); }
        }
        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-2px, 2px); }
          94% { transform: translate(2px, -2px); }
          96% { transform: translate(-2px, -2px); }
          98% { transform: translate(2px, 2px); }
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes electricBorder {
          0%, 100% { box-shadow: 0 0 10px var(--color), 0 0 20px var(--color), inset 0 0 10px rgba(0,0,0,0.5); }
          50% { box-shadow: 0 0 20px var(--color), 0 0 40px var(--color), inset 0 0 15px rgba(0,0,0,0.5); }
        }
      `}</style>

      {/* Header */}
      <header className="relative z-10 py-4 md:py-6 px-4 border-b-2 border-[#00f0ff]/30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-center tracking-tighter"
              style={{
                fontFamily: "'Black Ops One', system-ui",
                textShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff',
                animation: 'glitch 3s infinite'
              }}>
            <span className="text-[#00f0ff]">FACE</span>
            <span className="text-white mx-2">×</span>
            <span className="text-[#ff00aa]">FIGHTER</span>
          </h1>
          <p className="text-center text-[#00f0ff]/70 text-xs sm:text-sm mt-2 tracking-[0.3em] uppercase"
             style={{ fontFamily: "'Orbitron', monospace" }}>
            Upload Your Face • Choose Your Fighter
          </p>
        </div>
      </header>

      {/* VS Badge */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <div className="relative">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#ff00aa] to-[#00f0ff] flex items-center justify-center"
               style={{
                 animation: 'pulse 2s ease-in-out infinite',
                 boxShadow: '0 0 30px rgba(255,0,170,0.5), 0 0 60px rgba(0,240,255,0.3)'
               }}>
            <span className="text-2xl md:text-3xl font-black text-black" style={{ fontFamily: "'Black Ops One', system-ui" }}>VS</span>
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 py-6 md:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Fighter Selection Tabs (Mobile) */}
          <div className="lg:hidden mb-6">
            <div className="flex gap-2 justify-center">
              {fighters.map((fighter, idx) => (
                <button
                  key={fighter.id}
                  onClick={() => setSelectedFighter(fighter.id)}
                  className={`px-4 py-2 text-sm font-bold tracking-wider transition-all ${
                    selectedFighter === fighter.id
                      ? 'bg-gradient-to-r from-[#00f0ff] to-[#ff00aa] text-black'
                      : 'bg-white/10 text-white/70'
                  }`}
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                  }}
                >
                  {fighter.name || `PLAYER ${idx + 1}`}
                </button>
              ))}
            </div>
          </div>

          {/* Fighters Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
            {fighters.map((fighter, idx) => (
              <div
                key={fighter.id}
                className={`${selectedFighter !== fighter.id ? 'hidden lg:block' : ''}`}
                style={{ animation: 'slideIn 0.5s ease-out' }}
              >
                <FighterSelect
                  fighter={fighter}
                  playerNumber={idx + 1}
                  onFaceUpload={(img) => handleFaceUpload(fighter.id, img)}
                  onNameChange={(name) => handleNameChange(fighter.id, name)}
                  onBodyTypeChange={(bt) => handleBodyTypeChange(fighter.id, bt)}
                  onStanceChange={(st) => handleStanceChange(fighter.id, st)}
                  isReady={isReady[idx]}
                  onToggleReady={() => toggleReady(idx)}
                />
              </div>
            ))}
          </div>

          {/* VS Badge Mobile */}
          <div className="lg:hidden flex justify-center my-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff00aa] to-[#00f0ff] flex items-center justify-center"
                 style={{ boxShadow: '0 0 20px rgba(255,0,170,0.5)' }}>
              <span className="text-xl font-black text-black" style={{ fontFamily: "'Black Ops One', system-ui" }}>VS</span>
            </div>
          </div>

          {/* Fight Button */}
          {bothReady && (
            <div className="mt-8 md:mt-12 text-center" style={{ animation: 'slideIn 0.3s ease-out' }}>
              <button
                className="relative px-12 md:px-16 py-4 md:py-5 text-xl md:text-2xl font-black tracking-wider bg-gradient-to-r from-[#ff00aa] via-[#ff6600] to-[#ffcc00] text-black overflow-hidden group"
                style={{
                  fontFamily: "'Black Ops One', system-ui",
                  clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
                  animation: 'shake 0.5s ease-in-out infinite'
                }}
              >
                <span className="relative z-10">FIGHT!</span>
                <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-4 border-t border-[#00f0ff]/20">
        <p className="text-center text-[10px] sm:text-xs text-white/30 tracking-wider"
           style={{ fontFamily: "'Orbitron', monospace" }}>
          Requested by <span className="text-[#00f0ff]/50">@Salmong</span> · Built by <span className="text-[#ff00aa]/50">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

export default App;