import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">
        <h2>Pricing</h2>
        <p>Choose a plan that fits your needs.</p>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Basic</h3>
            <p>$799</p>
            <ul>
              <li>1 Mole Trap Unit</li>
              <li>Manual Guide</li>
              <li>Email Support</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3>Pro</h3>
            <p>$1499</p>
            <ul>
              <li>2 Mole Trap Units</li>
              <li>Installation Support</li>
              <li>Priority Email Support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
