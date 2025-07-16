import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [selectedColor, setSelectedColor] = useState('#007bff');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('colorFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return null;
    
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h != 6;
    }
    
    return {
      h: Math.round(h! * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const getRgbString = () => {
    const rgb = hexToRgb(selectedColor);
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'rgb(0, 0, 0)';
  };

  const getHslString = () => {
    const hsl = hexToHsl(selectedColor);
    return hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : 'hsl(0, 0%, 0%)';
  };

  const generateRandomColor = () => {
    let letters = "0123456789ABCDEF";
    let color = '#';
    for (let i = 0; i < 6; i++)
    color += letters[(Math.floor(Math.random() * 16))];
    setSelectedColor(color);
  }

  const copyHex = () => {
    navigator.clipboard.writeText(selectedColor);
  }

  const addToFavorites = () => {
    if (!favorites.includes(selectedColor)) {
      setFavorites([...favorites, selectedColor]);
    }
    localStorage.setItem('colorFavorites', JSON.stringify(favorites));
  };

  const removeFromFavorites = (colorToRemove: string) => {
    setFavorites(favorites.filter(color => color !== colorToRemove));
  };

  return (
    <div className="container">
      <div className="color-picker">
        <h1 className="title">
          Color Picker Ajaib
        </h1>

        <div className="auto-picker">
          <div className="color-picker-container">
            <label className="color-picker-label">Pilih Warna</label>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="picker-input"
              title="Pilih Warna"
            />
          </div>
          <p className="text-preview">
            Warna Terpilih: <span className="color-value" style={{ color: selectedColor }}>{selectedColor}</span>
          </p>
        </div>

        <div className="color-info">
          <div className="color-info-row">
            <span className="info-label">HEX:</span>
            <span className="info-value">{selectedColor}</span>
          </div>
          <div className="color-info-row">
            <span className="info-label">RGB:</span>
            <span className="info-value">{getRgbString()}</span>
          </div>
          <div className="color-info-row">
            <span className="info-label">HSL:</span>
            <span className="info-value">{getHslString()}</span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-btn copy-btn" onClick={copyHex}>Copy HEX</button>
          <button className="action-btn random-btn" onClick={generateRandomColor}>Random</button>
          <button className="action-btn favorite-btn" onClick={addToFavorites}>Add to Favorites</button>
        </div>

        <div className="large-preview">
          <div className="large-color-box" style={{ backgroundColor: selectedColor }}>
          </div>
        </div>

        <div className="quick-colors">
          <h3 className="quick-title">
            Pilih Warna Cepat:
          </h3>
          <div className="color-grid">
            <button className="quick-color-btn red" onClick={() => setSelectedColor('#EF4444')}>
              Merah
            </button>
            <button className="quick-color-btn green" onClick={() => setSelectedColor('#22C55E')}>
              Hijau
            </button>
            <button className="quick-color-btn blue" onClick={() => setSelectedColor('#3B82F6')}>
              Biru
            </button>
            <button className="quick-color-btn yellow" onClick={() => setSelectedColor('#FBFF02')}>
              Kuning
            </button>
            <button className="quick-color-btn purple" onClick={() => setSelectedColor('#8B5CF6')}>
              Ungu
            </button>
          </div>
        </div>

        <div className="favorites">
          <h3 className="favorites-title">
            Favorite Colors:
          </h3>
            {favorites.length === 0 ? (
              <p className="no-favorites">
                Belum ada warna favorit.
              </p>
            ) : (
              <div className="favorites-grid">
                {favorites.map((color, index) => (
                  <div key={index} className="favorite-card" onClick={() => setSelectedColor(color)}>
                    <div
                      className="favorite-color-circle"
                      style={{ backgroundColor: color }}
                    />
                    <span className="favorite-color-hex">{color}</span>
                    <button
                      className="favorite-remove-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(color);
                      }}
                      title="Remove from favorites"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        
      </div>
    </div>
  );
}

export default App;