"use client";
import React, { useState, useEffect } from "react";
import dicebot2 from "../assets/dicebot2.png";
import youwin from "../assets/youwin.png";
import youlost from "../assets/youlost.png";
import drawgame from "../assets/drawgame.gif";
import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import Swal from "sweetalert2";
import Image from "next/image";
import "./game2.css";

const DicebotChallenge = () => {
  const [userDice, setUserDice] = useState<number[]>([]);
  const [cpuDice, setCpuDice] = useState<number[]>([]);
  const [userScore, setUserScore] = useState<number>(0);
  const [cpuScore, setCpuScore] = useState<number>(0);
  const [usuarioId, setUsuarioId] = useState("");

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

  const rollDice = (numDice: number) => {
    const userRolls = [];
    const cpuRolls = [];

    for (let i = 0; i < numDice; i++) {
      userRolls.push(Math.floor(Math.random() * 6) + 1);
      cpuRolls.push(Math.floor(Math.random() * 6) + 1);
    }

    const userTotal = userRolls.reduce((acc, curr) => acc + curr, 0);
    const cpuTotal = cpuRolls.reduce((acc, curr) => acc + curr, 0);

    setUserDice(userRolls);
    setCpuDice(cpuRolls);
    setUserScore(userTotal);
    setCpuScore(cpuTotal);

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
          registrarResultado("gano", usuarioId);
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
          registrarResultado("perdio", usuarioId);
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
          registrarResultado("empato", usuarioId);
        }
      });
    }
  };

  const registrarResultado = async (resultado: string, userId: string) => {
    try {
      const response = await axios.post(
        `https://diceapp.onrender.com/juego/${usuarioId}`,
        {
          tipoJuego: "desafio",
          resultado: resultado,
          usuarioId: userId,
        }
      );

      console.log("Resultado registrado:", response.data);
    } catch (error) {
      console.error("Error al registrar el resultado:", error);
    }
  };

  return (
    <div className="center-container">
      <div>
        <Image src={dicebot2.src} alt="Dicebot" width={10} height={10} />
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
