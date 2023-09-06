"use client";
import React from "react";
import Link from "next/link";
import "./about.css";
import {
  SiTypescript,
  SiNextdotjs,
  SiMysql,
  SiSequelize,
  SiVercel,
  SiRender,
  SiGit,
  SiGithub,
  SiBootstrap,
  SiMatrix,
  SiPostman,
  SiCanva,
} from "react-icons/si";
import { FaNode } from "react-icons/fa";
import { IoLogoNodejs } from "react-icons/io";
import { AiFillThunderbolt, AiFillDatabase } from "react-icons/ai";

const AboutPage = () => {
  const technologies = [
    {
      name: "Typescript",
      documentationUrl: "https://www.typescriptlang.org/docs",
      Icon: <SiTypescript />,
    },
    {
      name: "Next.js",
      documentationUrl: "https://nextjs.org/",
      Icon: <SiNextdotjs />,
    },
    {
      name: "Node.js",
      documentationUrl: "https://nodejs.org/es/docs/",
      Icon: <FaNode />,
    },
    {
      name: "Express.js",
      documentationUrl: "https://expressjs.com/",
      Icon: <IoLogoNodejs />,
    },
    {
      name: "MySQL",
      documentationUrl: "https://dev.mysql.com/doc/",
      Icon: <SiMysql />,
    },
    {
      name: "Sequelize",
      documentationUrl: "https://sequelize.org/",
      Icon: <SiSequelize />,
    },
    {
      name: "Vercel",
      documentationUrl: "https://vercel.com/docs",
      Icon: <SiVercel />,
    },
    {
      name: "Render",
      documentationUrl: "https://render.com/docs",
      Icon: <SiRender />,
    },
    {
      name: "Git",
      documentationUrl: "https://git-scm.com/doc",
      Icon: <SiGit />,
    },
    {
      name: "GitHub",
      documentationUrl: "https://docs.github.com/es",
      Icon: <SiGithub />,
    },
    {
      name: "Thunder Client",
      documentationUrl: "https://www.thunderclient.io/docs/",
      Icon: <AiFillThunderbolt />,
    },
    {
      name: "Bootstrap",
      documentationUrl: "https://getbootstrap.com/docs/",
      Icon: <SiBootstrap />,
    },
    {
      name: "MaterialUI",
      documentationUrl: "https://mui.com/material-ui/getting-started/",
      Icon: <SiMatrix />,
    },
    {
      name: "PostMan",
      documentationUrl: "https://www.postman.com/",
      Icon: <SiPostman />,
    },
    {
      name: "HeidiSQL",
      documentationUrl: "https://www.heidisql.com/",
      Icon: <AiFillDatabase />,
    },
    {
      name: "Canva",
      documentationUrl: "https://www.canva.com/",
      Icon: <SiCanva />,
    },
  ];

  return (
    <div className="about-styles row col-10 justify-content-evenly text-center mx-auto">
      <h1 className="tituloproy my-5">
        DiceApp - creado por Jon Nahuel Pereyra
      </h1>
      <h2 className="text-center">
        Este es el stack tecnologico con el que se realizo esta plataforma
      </h2>
      <div className="technologies col-10 d-flex justify-content-between flex-wrap mt-4 mb-5">
        {technologies?.map((Technology, index) => (
          <Link
            style={{ textDecoration: "none" }}
            key={index}
            href={Technology.documentationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h1>{Technology.Icon}</h1>
            <span>{Technology.name}</span>
          </Link>
        ))}
      </div>

      <div className="col-md-12 col-sm-5">
        <h2 className="tituloproy2 my-4">
          La plataforma cuenta con dos juegos. Ante cualquier comportamiento no
          deseado,
          <br /> envía un E-mail al desarrollador a{" "}
          <a
            style={{
              border: "solid",
              padding: "9px",
              borderRadius: "13px",
              backgroundColor: "white",
              opacity: "0.8",
            }}
            href="mailto:jonnahuel78@gmail.com"
          >
            ---jon nahuel pereyra---
          </a>
        </h2>
      </div>
    </div>
  );
};

export default AboutPage;
