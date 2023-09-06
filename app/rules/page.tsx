// components/CasinoRules.js
import React from "react";
import "./rules.css";

const RulesPage = () => {
  return (
    <div className="casinoRules">
      <h1>Reglas de los Juegos</h1>
      <div className="gameRules">
        <h2>Juego de Probabilidades</h2>
        <p>
          En este juego, tienes que seleccionar los valores que crees que
          saldrán en los dados. Luego, puedes calcular la probabilidad de que
          esos valores aparezcan en un lanzamiento.
        </p>
      </div>
      <div className="gameRules">
        <h2>Adivina el Número</h2>
        <p>
          En este juego, debes adivinar la suma de los valores que aparecerán en
          los dados. Si tu conjetura es correcta, ganas puntos.
        </p>
      </div>
      <div className="gameRules">
        <h2>Desafío contra DiceBot</h2>
        <p>
          ¿Tienes lo que se necesita para vencer a DiceBot? Enfréntate a esta
          CPU en un emocionante juego de dados.
        </p>
      </div>
    </div>
  );
};

export default RulesPage;
