// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forge: {
          dark: '#0f1117',
          ember: '#ff6b35',
          emberLight: '#ff8a5c',
          lava: '#f8333c',
          heat: '#f7b801',
          ash: '#1c1e26',
          card: '#23252d', // extra card base option
          neutral100: '#f8f8f8',
          neutral200: '#d4d4d8',
          surface: '#212121', 
        },
      },      
      
      backgroundImage: {
        'forge-landing': 'linear-gradient(135deg, #0f1117, #0f1117, #f8333c, #f7b801)',

        // I know it is messy, but I want to keep the options here for now
        
        // 🔥 Bold & Fiery (current)
        // 'forge-landing': 'linear-gradient(to bottom, #0f1117, #6a0572, #f8333c, #f7b801)',
        // 'forge-landing': 'linear-gradient(to bottom, #0f1117, #0f1117, #f8333c, #f7b801)',
        // 'forge-landing': 'linear-gradient(135deg, #0f1117, #0f1117, #f8333c, #f7b801)',
        // 'forge-landing': 'radial-gradient(circle at top, #0f1117, #0f1117, #f8333c, #f7b801)',
        
      
        // 🌄 Warm Sunset (orange to pink, smoother feel)
        // 'forge-landing': 'linear-gradient(to bottom, #0f1117, #f27059, #f76e9a)',
      
        // 🌌 Twilight Subtle (dark purple into slate, very soft) - Like the transition, not the color
        // 'forge-landing': 'linear-gradient(to bottom, #0f1117, #3b0d55, #1a1c24)',
      
        // 🍇 Moody Grape (purple-heavy, rich vibe) - fun but too purple?
        // 'forge-landing': 'linear-gradient(to bottom, #0f1117, #5e239d, #b353e0)',
      
        // 🔁 Diagonal Ember (same colors, diagonal flow) - better than current
        // 'forge-landing': 'linear-gradient(135deg, #0f1117, #6a0572, #f8333c)',
      
        // 🎨 Soft Fade (low contrast, elegant) -- my jam
        // 'forge-landing': 'linear-gradient(to bottom, #0f1117, #1c1e26, #2a2d36)',
      
        // 🌈 Funky Neon (bold neon blend) -- woah, that is funky, too much
        // 'forge-landing': 'linear-gradient(to right, #0f1117, #ff6b35, #6a0572, #00f0ff)',
      
        // 🔥 Forge Core (lava at top fading to darkness) -- nah
        // 'forge-landing': 'linear-gradient(to bottom, #f8333c, #6a0572, #0f1117)',
      
        // 🌫️ Radial Glow (circular gradient from center-top)
        // 'forge-landing': 'radial-gradient(circle at top, #f7b801, #6a0572, #0f1117)',
        // Circular gradient from center-top with soft fade
        // 'forge-landing': 'radial-gradient(circle at top, #0f1117, #1c1e26, #2a2d36)',
        
        // 🌌 Twilight Subtle (dark purple into slate, very soft) - Like the transitino, not the colora
        // 'forge-landing': 'linear-gradient(to bottom, #0f1117, #1c1e26, #2a2d36)',
      },
      
    }    
  },
  plugins: [],
};
