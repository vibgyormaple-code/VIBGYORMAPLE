import React from 'react';
import './FrenchContent.css';

const FrenchContent = () => {
  return (
    <div className="french-content">
      <div className="french-section">
        <h2 className="french-title">PANEL AVANT:</h2>
        <div className="french-panel">
          <div className="product-image-placeholder">
            <span>Product Image</span>
          </div>
          <div className="product-info">
            <h3>Nom du produit: Piège à Taupes Grass Hawk</h3>
            <p className="slogan">Slogan: Vous le cultivez, nous le protégeons</p>
            <h4>Principales caractéristiques:</h4>
            <ul>
              <li>Construction robuste et durable pour une utilisation à long terme</li>
              <li>Installation facile avec un taux de réussite élevé</li>
              <li>Sans produits chimiques ni poisons – sûr pour les animaux domestiques et l'environnement</li>
              <li>Conception résistante aux intempéries pour une utilisation toute l'année</li>
              <li>Réutilisable et écologique</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="french-section">
        <h2 className="french-title">PANEL LATÉRAL:</h2>
        
        <div className="french-panel">
          <h3>COMMENT UTILISER:</h3>
          <ol>
            <li>Identifier les tunnels actifs – Localisez un tunnel surélevé et appuyez sur une petite section de terre. Vérifiez après 24 heures; si le sol est perturbé, le tunnel est actif.</li>
            <li>Préparer le piège – Creusez une petite ouverture dans le tunnel et insérez soigneusement le Piège à Taupes Grass Hawk.</li>
            <li>Armer le mécanisme – Activez le piège en abaissant le mécanisme de déclenchement.</li>
            <li>Surveiller et retirer – Vérifiez régulièrement le piège. Une fois une taupe capturée, retirez-la en toute sécurité et réinitialisez le piège si nécessaire.</li>
          </ol>
          <p><em>Veuillez consulter le manuel d'instructions à l'intérieur de la boîte pour des instructions détaillées.</em></p>
        </div>

        <div className="french-panel">
          <h3>PRÉCAUTIONS DE SÉCURITÉ:</h3>
          <ul>
            <li>Garder hors de portée des enfants.</li>
            <li>Toujours utiliser des gants lors de la manipulation du piège pour éviter le transfert d'odeurs humaines.</li>
            <li>Ne pas placer les pièges dans des zones accessibles aux animaux non ciblés.</li>
            <li>Vérifiez la réglementation locale sur la faune avant utilisation.</li>
          </ul>
        </div>

        <div className="french-panel">
          <h3>CONTENU DE L'EMBALLAGE:</h3>
          <ul>
            <li>1 x Piège à Taupes Grass Hawk</li>
            <li>1 x Manuel d'instructions</li>
          </ul>
        </div>

        <div className="french-panel">
          <h3>DÉTAILS DU FABRICANT:</h3>
          <ul>
            <li>Fabriqué par:</li>
            <li>Distribué par:</li>
            <li>Support client:</li>
            <li>Site Web:</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FrenchContent;
