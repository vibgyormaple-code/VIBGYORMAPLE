// import React from "react";
// import "./ProductDetails.css";
// import trapImage from "../assets/trap.png";

// const ProductDetails = () => {
//   return (
//     <section className="product-details-section" id="product-details">
//       <div className="product-details-container">
//         <h2>How to Use the Mole Trap</h2>
//         <img
//           src={trapImage}
//           alt="Mole Trap Instructions"
//           className="product-steps-image"
//         />
//         <div className="step-guide">
//           <h3>1. Setting the Trap</h3>
//           <p>
//             Locate the mole run. Press down the footplate to arm the trap. Place
//             the trap with the jaws centered over the tunnel. Step down the
//             handles to embed the trap and trigger it.
//           </p>

//           <h3>2. Moving the Trap</h3>
//           <p>
//             Relocate the trap if there are no moles caught in 2-3 days. Ensure
//             the trap is reset before reuse.
//           </p>

//           <h3>3. Removing the Mole</h3>
//           <p>
//             Pull the handles up carefully to remove the mole and reset the trap
//             for continued use.
//           </p>

//           <h3>4. Safety Tips</h3>
//           <p>
//             Always keep hands clear of the jaws. Store out of reach of children.
//             Use gloves when handling the trap.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductDetails;
///////////////
// import React from "react";
// import "./ProductDetails.css";
// import trapImage from "../assets/moletrap.png"; // corrected path to src/assets

// const ProductDetails = () => {
//   return (
//     <section className="product-details-section">
//       <div className="product-details-wrapper">
//         {/* Left - Image */}
//         <div className="product-image">
//           <img src={trapImage} alt="Mole Trap" />
//         </div>

//         {/* Right - Steps */}
//         <div className="product-info">
//           <h2>How to Use the Mole Trap</h2>

//           <div className="step">
//             <h3>1. Setting the Trap</h3>
//             <p>
//               Locate the mole run. Press down the footplate to arm the trap.
//               Place the trap with the jaws centered over the tunnel. Step down
//               the handles to embed the trap and trigger it.
//             </p>
//           </div>

//           <div className="step">
//             <h3>2. Moving the Trap</h3>
//             <p>
//               Relocate the trap if there are no moles caught in 2-3 days. Ensure
//               the trap is reset before reuse.
//             </p>
//           </div>

//           <div className="step">
//             <h3>3. Removing the Mole</h3>
//             <p>
//               Pull the handles up carefully to remove the mole and reset the
//               trap for continued use.
//             </p>
//           </div>

//           <div className="step">
//             <h3>4. Safety Tips</h3>
//             <p>
//               Always keep hands clear of the jaws. Store out of reach of
//               children. Use gloves when handling the trap.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductDetails;
import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import trapImage from "../assets/moletrap.png"; // fallback image

const ProductDetails = () => {
  const { id } = useParams();

  // You can later move this to a separate data file
  const productList = [
    {
      id: 1,
      name: "Mole Trap Basic",
      price: 799,
      description: "One unit with manual guide",
      image: trapImage,
      instructions: [
        "Locate the mole run. Press down the footplate to arm the trap.",
        "Relocate if no moles are caught in 2–3 days. Reset before reuse.",
        "Pull handles carefully to remove mole. Reset for reuse.",
        "Keep hands clear. Store away from children. Use gloves.",
      ],
    },
    {
      id: 2,
      name: "Mole Trap Pro",
      price: 1499,
      description: "Two units with support",
      image: trapImage,
      instructions: [
        "Set both traps in active mole runs for maximum effectiveness.",
        "Move traps every 2–3 days if no activity.",
        "Clean and reset traps regularly.",
        "Wear gloves and follow safety precautions.",
      ],
    },
  ];

  const product = productList.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Product not found</h2>;
  }

  return (
    <section className="product-details-section">
      <div className="product-details-wrapper">
        {/* Left - Image */}
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Right - Details */}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>
            <strong>₹{product.price}</strong>
          </p>

          <h3>How to Use:</h3>
          {product.instructions.map((step, index) => (
            <div key={index} className="step">
              <h4>Step {index + 1}</h4>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
