import React from "react";
import "./rules.css";

const RulesPage = () => {
  return (
    <div className="row center-container fs-5">
      <div className="casinoRules">
        <div className="gameRules col-10 mx-auto">
          <h1 className="mb-5">Reglas</h1>
          <h2>Visor de Probabilidades</h2>
          <p>
            En este agregado, tienes que seleccionar los valores que crees que
            saldrán en los dados. Luego, puedes calcular la probabilidad de que
            esos valores aparezcan en un lanzamiento.
          </p>
        </div>
        <div className="gameRules">
          <h2>Adivina el Número</h2>
          <p>
            En este juego, basado en tus probabilidades, debes adivinar la suma
            de los valores que aparecerán en los dados. Si tu predicción es
            correcta, ganas!
          </p>
        </div>
        <div className="gameRules">
          <h2>Desafío contra DiceBot</h2>
          <p>
            ¿Tienes lo que se necesita para vencer a DiceBot? Enfréntate a esta
            CPU en un emocionante juego de dados. <br /> Este es un desafío a
            muerte súbita. Podes elejir entre lanzar 3 o 6 dados. Lanzas vos
            primero, luego lanza Dicebot. El que saca mas puntos en la suma del
            valor de todos los dados, gana!
          </p>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
