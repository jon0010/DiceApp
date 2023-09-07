"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import Swal from "sweetalert2";
import "./profile.css";

interface Juego {
  id: number;
  fechaHora: string;
  tipoJuego: string;
  resultado: string;
  createdAt: Date;
}

const ProfilePage = () => {
  const [usuarioId, setUsuarioId] = useState("");
  const [usuarioNombre, setUsuarioNombre] = useState("");
  const [historialJuegos, setHistorialJuegos] = useState<Juego[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(7);
  console.log(usuarioId);
  console.log(historialJuegos);

  useEffect(() => {
    const verificarAutenticacion = async () => {
      const userToken = Cookies.get("token");
      if (userToken) {
        try {
          const decoded = decodeToken(userToken) as {
            id: string;
            nombre: string;
          };
          if (decoded) {
            const userId = decoded.id;
            const userName = decoded.nombre;
            setUsuarioId(userId);
            setUsuarioNombre(userName);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    verificarAutenticacion();

    axios
      .get(`https://diceapp.onrender.com/juego/${usuarioId}`)
      .then((response) => {
        setHistorialJuegos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener el historial de juegos:", error);
      });
  }, [usuarioId]);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = historialJuegos.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(historialJuegos.length / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDeleteGame = async (juegoId: number) => {
    const confirmationResult = await Swal.fire({
      title: "¿Estás seguro de que deseas borrar este elemento?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "borrar",
      cancelButtonText: "Cancelar",
    });

    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://diceapp.onrender.com/juego/${juegoId}`
        );

        if (response.status === 200) {
          const updatedGames = historialJuegos.filter(
            (juego) => juego.id !== juegoId
          );
          setHistorialJuegos(updatedGames);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Elemento borrado exitosamente",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Hubo un error al borrar el elemento",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error al borrar el juego:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error en el servidor",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="row center-container fs-4">
      <div className="casinoRules">
        <div className="gameRules col-10 mx-auto">
          <h1 className="mb-5">Bienvenido {usuarioNombre}</h1>
          <h2>Historial de Jugadas</h2>
          <p>
            Este es tu perfil, aca vas a poder controlar el historial de todas
            las oportunidades en las que jugaste, ya sea adivinando el numero o
            desafiando a dicebot. Vas a poder borrar un elemento del historial,
            como visualizar la fecha y hora en la que jugaste, el juego que
            elejiste y si el resultado de la jugada.
          </p>
        </div>
        <table
          className="table table-bordered table-striped mx-auto"
          style={{ border: "solid", width: "70%" }}
        >
          <thead>
            <tr>
              <th className="fs-3">Fecha y Hora</th>
              <th className="fs-3">Juego</th>
              <th className="fs-3">Resultado</th>
              <th className="fs-3">Borrar elemento</th>
            </tr>
          </thead>
          <tbody>
            {currentGames?.map((juego) => (
              <tr key={juego?.id}>
                <td>{new Date(juego?.createdAt).toLocaleString()}</td>
                <td>{juego?.tipoJuego}</td>
                <td>{juego?.resultado}</td>
                <td>
                  <button
                    onClick={() => handleDeleteGame(juego?.id)}
                    className="btn btn-danger"
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button
                  className={`page-link ${
                    currentPage === number ? "active" : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
              >
                Siguiente
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
