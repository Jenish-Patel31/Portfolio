import React, { useState } from 'react';
import StarsBackground from '../components/StarsBackground';
import RadialNavbarDemo from '../components/RadialNavbarDemo';
import ParallaxNavbarDemo from '../components/ParallaxNavbarDemo';
import MinimalistNavbarDemo from '../components/MinimalistNavbarDemo';

const NAV_OPTIONS = [
  { label: 'Radial Menu', value: 'radial' },
  { label: '3D Parallax', value: 'parallax' },
  { label: 'Minimalist Top Bar', value: 'minimalist' },
];

export default function NavbarTestPage() {
  const [selected, setSelected] = useState('radial');

  return (
    <div className="min-h-screen bg-bg-primary relative">
      <StarsBackground />
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-50 flex space-x-4 bg-bg-card/80 backdrop-blur-md rounded-xl p-4 shadow-lg">
        {NAV_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${selected === opt.value ? 'bg-gradient-to-r from-accent-blue to-accent-cyan text-white shadow' : 'bg-bg-secondary text-text-secondary hover:bg-accent-blue/10'}`}
            onClick={() => setSelected(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="pt-32">
        {selected === 'radial' && <RadialNavbarDemo />}
        {selected === 'parallax' && <ParallaxNavbarDemo />}
        {selected === 'minimalist' && <MinimalistNavbarDemo />}
      </div>
    </div>
  );
}
