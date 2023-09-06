"use client";
import React, { useState } from "react";

const DicebotChallenge = () => {
  const [userDice, setUserDice] = useState<number[]>([]);
  const [cpuDice, setCpuDice] = useState<number[]>([]);
  const [userScore, setUserScore] = useState<number>(0);
  const [cpuScore, setCpuScore] = useState<number>(0);

  const rollDice = (numDice: number) => {
    const userRolls = [];
    const cpuRolls = [];

    // Simular tiradas de dados para el usuario y la CPU
    for (let i = 0; i < numDice; i++) {
      userRolls.push(Math.floor(Math.random() * 6) + 1); // Dado de 6 caras
      cpuRolls.push(Math.floor(Math.random() * 6) + 1);
    }

    // Calcular puntajes
    const userTotal = userRolls.reduce((acc, curr) => acc + curr, 0);
    const cpuTotal = cpuRolls.reduce((acc, curr) => acc + curr, 0);

    // Actualizar los estados
    setUserDice(userRolls);
    setCpuDice(cpuRolls);
    setUserScore(userTotal);
    setCpuScore(cpuTotal);
  };

  const determineWinner = () => {
    if (userScore > cpuScore) {
      return "¡Tú ganas!";
    } else if (cpuScore > userScore) {
      return "La CPU gana.";
    } else {
      return "Es un empate.";
    }
  };

  return (
    <div>
      <h1>Juego de Dados</h1>
      <button onClick={() => rollDice(3)}>Tirar 3 Dados</button>
      <button onClick={() => rollDice(6)}>Tirar 6 Dados</button>
      <div>
        <h2>Tus Dados: {userDice.join(", ")}</h2>
        <h2>Tu Puntaje: {userScore}</h2>
      </div>
      <div>
        <h2>Dados de la CPU: {cpuDice.join(", ")}</h2>
        <h2>Puntaje de la CPU: {cpuScore}</h2>
      </div>
      {userDice.length > 0 && (
        <div>
          <h2>{determineWinner()}</h2>
        </div>
      )}
    </div>
  );
};

export default DicebotChallenge;
