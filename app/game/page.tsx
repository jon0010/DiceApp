"use client";
import React, { useState } from "react";

const AdivinaElNumero = () => {
  const [numDice, setNumDice] = useState(1);
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [diceValues, setDiceValues] = useState(Array(9).fill(""));
  const [probability, setProbability] = useState<number | null>(null);

  const rollDiceAndGuess = () => {
    const diceResults: number[] = [];
    for (let i = 0; i < numDice; i++) {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      diceResults.push(randomValue);
    }

    const desiredValues = diceValues.map((value) => parseInt(value));
    const isCorrectGuess = desiredValues.every((value) =>
      diceResults.includes(value)
    );

    if (isCorrectGuess) {
      setResult("¡Correcto! Ganaste.");
      setScore(score + 1);
    } else {
      setResult("Incorrecto. Inténtalo de nuevo.");
    }
  };

  const calculateProbability = () => {
    const valuesEntered = diceValues
      .map((value) => parseInt(value))
      .filter((value) => !isNaN(value));

    if (valuesEntered.length === 0) {
      setProbability(0);
      return;
    }

    const targetSum = valuesEntered.reduce((acc, value) => acc + value, 0);
    let favorableOutcomes = 0;
    let totalOutcomes = 0;

    const calculateOutcomes = (currentIndex: number, currentSum: number) => {
      if (currentIndex === numDice) {
        if (currentSum === targetSum) {
          favorableOutcomes++;
        }
        totalOutcomes++;
        return;
      }

      for (let i = 1; i <= 6; i++) {
        calculateOutcomes(currentIndex + 1, currentSum + i);
      }
    };

    calculateOutcomes(0, 0);

    const calculatedProbability = (favorableOutcomes / totalOutcomes) * 100;
    setProbability(parseFloat(calculatedProbability.toFixed(2)));
  };

  return (
    <div>
      <h1>Adivina el número</h1>
      <div>
        <label>Cantidad de Dados:</label>
        <select onChange={(e) => setNumDice(parseInt(e.target.value))}>
          {Array.from({ length: 9 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Valores deseados:</label>
        {Array.from({ length: numDice }, (_, i) => (
          <input
            key={i}
            type="number"
            value={diceValues[i]}
            onChange={(e) => {
              const newValues = [...diceValues];
              newValues[i] = e.target.value;
              setDiceValues(newValues);
            }}
          />
        ))}
      </div>
      <button onClick={rollDiceAndGuess}>Tirar Dados y Adivinar</button>
      <div>
        <h2>Resultado: {result}</h2>
        <h2>Puntaje: {score}</h2>
      </div>
      <div>
        <h2>Visor de Probabilidades</h2>
        <button onClick={calculateProbability}>Calcular Probabilidad</button>
        {probability !== null && (
          <div>
            <h2>Probabilidad: {probability}%</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdivinaElNumero;
