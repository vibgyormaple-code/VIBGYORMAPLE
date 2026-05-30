import React from 'react';
import './ColorPaletteTest.css';

const ColorPaletteTest = () => {
  return (
    <div className="color-test-container">
      <h1>Color Palette Showcase</h1>
      <p>Testing the creative use of #FF0000 (Red) and #4E565A (Dark Gray)</p>
      
      <div className="color-grid">
        <div className="color-box red-primary">
          <span>#FF0000</span>
          <span>Primary Red</span>
        </div>
        <div className="color-box gray-primary">
          <span>#4E565A</span>
          <span>Dark Gray</span>
        </div>
        <div className="color-box red-gradient">
          <span>Red Gradient</span>
        </div>
        <div className="color-box gray-gradient">
          <span>Gray Gradient</span>
        </div>
      </div>
      
      <div className="demo-section">
        <h2>Creative Usage Examples</h2>
        <div className="demo-cards">
          <div className="demo-card red-accent">
            <h3>Red Accent Card</h3>
            <p>This card uses red as an accent color against the gray background.</p>
          </div>
          <div className="demo-card gray-accent">
            <h3>Gray Accent Card</h3>
            <p>This card uses gray as the primary color with red highlights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteTest;
