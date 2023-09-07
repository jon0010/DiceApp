import React from "react";
import dicelogo from "../../app/assets/dicelogo.png";
import Image from "next/image";
import "./navbar.css";
import Link from "next/link";

function Navbar() {
  return (
    <div>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="elementonav nav-link active fw-bold text-white fs-5"
                  aria-current="page"
                  href="/gameNotLogin"
                >
                  Juego
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
            </ul>
            <Link style={{ textDecoration: "none" }} href="/login">
              <span className="loginBtn me-5">Iniciar sesión</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
