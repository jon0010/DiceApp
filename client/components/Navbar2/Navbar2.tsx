import React from "react";
import dicelogo from "../../app/assets/dicelogo.png";
import "./navbar2.css";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface NavBar2Props {
  clientId: string;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar2: React.FC<NavBar2Props> = ({
  clientId,
  isLoggedIn,
  onLogout,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (clientId) {
        const response = await axios.post(`http://localhost:3001/logout`);
        const user = response.data;
        console.log({ logout: user });
      }
      Cookies.remove("token");
      if (router) {
        router.push("/");
      }
      onLogout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      {isLoggedIn && (
        <nav className="navbar navbar-expand-lg bg-dark text-white">
          <div className="container-fluid">
            <Link className="navbar-brand ms-5" href="/">
              <Image
                src={dicelogo.src}
                alt="dicelogo"
                style={{ width: "7.5em" }}
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="elementonav nav-link active fw-bold text-white fs-5"
                    aria-current="page"
                    href="/game"
                  >
                    Adivina el numero
                  </Link>
                </li>
                <li className="elementonav nav-item fw-bold fs-5">
                  <Link className="nav-link text-white" href="/game2">
                    Desafío de Dicebot
                  </Link>
                </li>
                <li className="elementonav nav-item fw-bold fs-5">
                  <Link className="nav-link text-white" href="/rules">
                    Reglas
                  </Link>
                </li>
                <li className="elementonav nav-item fw-bold fs-5">
                  <Link className="nav-link text-white" href="/about">
                    Acerca de
                  </Link>
                </li>
                <li className="elementonav nav-item fw-bold fs-5">
                  <Link className="nav-link text-white" href="/user-profile">
                    Mi perfil
                  </Link>
                </li>
              </ul>
              <Link style={{ textDecoration: "none" }} href="/">
                <span onClick={handleLogout} className="loginBtn me-5">
                  cerrar sesión
                </span>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar2;
