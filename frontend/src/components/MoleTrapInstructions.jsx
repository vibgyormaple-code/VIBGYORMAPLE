import React from "react";
import "./MoleTrapInstructions.css";
import instruction1 from "../assets/instruction-1.png";
import instruction2 from "../assets/instruction-2.png";
import instruction3 from "../assets/instruction-3.png";
import instruction4 from "../assets/instruction-4.png";

const MoleTrapInstructions = () => {
  return (
    <div className="mole-trap-instructions">
      <center>
        <h1
          style={{
            color: "#ed0d0dff",
            fontSize: "2.5rem",
            marginBottom: "20px",
          }}
        >
          HOW TO USE - 4 Easy Steps
        </h1>
      </center>

      <div className="instructions-grid">
        <div className="instruction-step">
          <img src={instruction1} alt="Step 1" className="instruction-image" />
          <div className="step-number">1</div>
          <h3>Identify Active Mole Tunnels</h3>
          <p>
            Locate a raised mole tunnel and press down a small section of soil.
            Check after 24 hours; if the soil is distributed tunnel is active.
          </p>
        </div>

        <div className="instruction-step">
          <img src={instruction2} alt="Step 2" className="instruction-image" />
          <div className="step-number">2</div>
          <h3>Prepare Location</h3>
          <p>
            Dig a small opening in the active tunnel, just large enough for the
            trap.
          </p>
        </div>

        <div className="instruction-step">
          <img src={instruction3} alt="Step 3" className="instruction-image" />
          <div className="step-number">3</div>
          <h3>Set the Trap</h3>
          <p>Engage the trap by pressing down the trigger mechanism.</p>
        </div>

        <div className="instruction-step">
          <img src={instruction4} alt="Step 4" className="instruction-image" />
          <div className="step-number">4</div>
          <h3>Monitor Regularly</h3>
          <p>
            Regularly Check the trap.Once a mole is captured,remove it safely
            and reset if needed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoleTrapInstructions;
