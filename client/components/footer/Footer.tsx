import React from "react";
import Link from "next/link";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <div>
      <footer className="seccion-oscura d-flex flex-column align-items-center justify-content-center">
        <Link className="navbar-footer" aria-current="page" href="/">
          Dice App
        </Link>

        <p className="footer-texto text-center">
          El desafío de dicebot te espera
        </p>
        <div className="iconos-redes-sociales d-flex flex-wrap align-items-center justify-content-center">
          <a href="" target="_blank" rel="noopener noreferrer">
            <i>
              <FaFacebook />
            </i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <i>
              <FaYoutube />
            </i>
          </a>
          <a
            href="mailto:jonnahuel78@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>
              <BiLogoGmail />
            </i>
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <i>
              <FaSquareInstagram />
            </i>
          </a>
        </div>
        <div className="derechos-de-autor">
          Creado por Jon Nahuel Pereyra (2023) &#169;
        </div>
      </footer>
    </div>
  );
};

export default Footer;
