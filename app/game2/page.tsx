"use client";
import React, { useState } from "react";
import dicebot2 from "../assets/dicebot2.png";
import youwin from "../assets/youwin.png";
import youlost from "../assets/youlost.png";
import kingdice from "../assets/kingdice.gif";
import drawgame from "../assets/drawgame.gif";
import Swal from "sweetalert2";
import "./game2.css";

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

    // Determinar al ganador después de actualizar los estados
    determineWinner(userTotal, cpuTotal);
  };

  const determineWinner = (userTotal: number, cpuTotal: number) => {
    if (userTotal > cpuTotal) {
      Swal.fire({
        imageUrl: youwin.src,
        imageHeight: 350,
        imageAlt: "A win image",
        position: "top",
        backdrop: `
        rgba(3, 128, 33, 0.37)
        left top
        no-repeat
      `,
      }).then((result) => {
        if (result.isConfirmed) {
          setUserDice([]);
          setCpuDice([]);
          setUserScore(0);
          setCpuScore(0);
        }
      });
    } else if (cpuTotal > userTotal) {
      Swal.fire({
        imageUrl: youlost.src,
        imageHeight: 350,
        imageAlt: "A lost image",
        position: "top",
        backdrop: `
        rgba(128, 3, 3, 0.37)
        left top
        no-repeat
      `,
      }).then((result) => {
        if (result.isConfirmed) {
          setUserDice([]);
          setCpuDice([]);
          setUserScore(0);
          setCpuScore(0);
        }
      });
    } else {
      Swal.fire({
        imageUrl: drawgame.src,
        imageHeight: 350,
        imageAlt: "A draw image",
        position: "top",
        backdrop: `
        left top
        no-repeat
      `,
      }).then((result) => {
        if (result.isConfirmed) {
          setUserDice([]);
          setCpuDice([]);
          setUserScore(0);
          setCpuScore(0);
        }
      });
    }
  };

  return (
    <div className="center-container">
      <div>
        <img src={dicebot2.src} alt="Dicebot" />
        <h1 style={{ borderTop: "solid", width: "18em", marginBottom: "1em" }}>
          Desafío contra Dicebot
        </h1>
      </div>
      <div className="dice-buttons">
        <button className="botondice me-5" onClick={() => rollDice(3)}>
          Tirar 3 Dados
        </button>
        <button className="botondice ms-5" onClick={() => rollDice(6)}>
          Tirar 6 Dados
        </button>
      </div>
      <div className="user-info">
        <h2>Tus Dados: {userDice.join(", ")}</h2>
        <h2>Tu Puntaje: {userScore}</h2>
      </div>
      <div className="cpu-info">
        <h2>Dados de Dicebot: {cpuDice.join(", ")}</h2>
        <h2>Puntaje de Dicebot: {cpuScore}</h2>
      </div>
    </div>
  );
};

export default DicebotChallenge;
