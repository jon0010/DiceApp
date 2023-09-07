"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import "./game1.css";

const AdivinaElNumero = () => {
  const initialState = {
    numDice: 1,
    result: "",
    score: 0,
    diceValues: Array(9).fill(""),
    probability: 0,
  };

  const [gameState, setGameState] = useState(initialState);
  const [usuarioId, setUsuarioId] = useState("");
  console.log(usuarioId);

  useEffect(() => {
    const verificarAutenticacion = async () => {
      const userToken = Cookies.get("token");
      if (userToken) {
        try {
          const decoded = decodeToken(userToken) as {
            id: string;
          };
          console.log({ a: decoded });
          if (decoded) {
            const userId = decoded.id;
            console.log(userId);
            setUsuarioId(userId);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    verificarAutenticacion();
  }, []);

  const rollDiceAndGuess = async (userId: string) => {
    setGameState(initialState);

    const { numDice, diceValues } = gameState;

    const diceResults = [];
    for (let i = 0; i < numDice; i++) {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      diceResults.push(randomValue);
    }

    const desiredValues = diceValues.map((value) => parseInt(value));

    const isCorrectGuess = diceResults.every((value) =>
      desiredValues.includes(value)
    );

    if (isCorrectGuess) {
      setGameState({
        ...gameState,
        result: `¡Le pegaste! Los números que salieron son: ${diceResults.join(
          ", "
        )}`,
        score: gameState.score + 1,
      });

      try {
        await axios.post(`https://diceapp.onrender.com/juego/${usuarioId}`, {
          tipoJuego: "adivina",
          resultado: "gano",
          usuarioId: userId,
        });
      } catch (error) {
        console.error("Error al crear el juego:", error);
      }
    } else {
      setGameState({
        ...gameState,
        result: `Incorrecto. Inténtalo de nuevo. Los números que salieron son: ${diceResults.join(
          ", "
        )}`,
      });
      try {
        await axios.post(`https://diceapp.onrender.com/juego/${usuarioId}`, {
          tipoJuego: "adivina",
          resultado: "perdio",
          usuarioId: userId,
        });
      } catch (error) {
        console.error("Error al crear el juego:", error);
      }
    }
  };

  const calculateProbability = () => {
    const { numDice, diceValues } = gameState;

    const valuesEntered = diceValues
      .map((value) => parseInt(value))
      .filter((value) => !isNaN(value));

    if (valuesEntered.length === 0) {
      setGameState({
        ...gameState,
        probability: 0,
      });
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
    setGameState({
      ...gameState,
      probability: parseFloat(calculatedProbability.toFixed(2)),
    });
  };

  return (
    <div className="center-container">
      <div className="row">
        <div className="col-md-4">
          <h2>Visor de Probabilidades</h2>
          <div>
            <label className="mt-2">Cantidad de Dados:</label>
            <select
              onChange={(e) =>
                setGameState({
                  ...gameState,
                  numDice: parseInt(e.target.value),
                })
              }
            >
              {Array.from({ length: 9 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mt-5">Valores deseados:</label>
            <br />
            {Array.from({ length: gameState.numDice }, (_, i) => (
              <input
                className="text-center fs-3 mt-2"
                style={{
                  width: "2em",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "10px",
                }}
                key={i}
                type="number"
                value={gameState.diceValues[i]}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (/^[1-6]$/.test(newValue) || newValue === "") {
                    const newValues = [...gameState.diceValues];
                    newValues[i] = newValue;
                    setGameState({ ...gameState, diceValues: newValues });
                  }
                }}
              />
            ))}
          </div>
          <button
            className="mt-5 mb-5 botondice"
            onClick={calculateProbability}
          >
            Calcular Probabilidad
          </button>
          {gameState.probability !== null && (
            <div>
              <h2
                style={{
                  border: "solid",
                  width: "10em",
                  padding: "13px",
                  borderRadius: "10px",
                  backgroundColor: "black",
                  opacity: "0.7",
                  marginLeft: "2.5em",
                }}
              >
                Probabilidad: {gameState.probability}%
              </h2>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <h1 className="text-center mt-5">Adivina el número</h1>
          <hr />
          <button
            className="botondice mb-5 mt-3"
            onClick={() => rollDiceAndGuess(usuarioId)}
          >
            Tirar Dados y Adivinar
          </button>
          <div>
            <h2>{gameState.result}</h2>
            <h2>Puntaje: {gameState.score}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdivinaElNumero;
