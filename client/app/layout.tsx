"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import Navbar2 from "@/components/Navbar2/Navbar2";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    const verificarAutenticacion = async () => {
      const userToken = Cookies.get("token");
      if (userToken) {
        try {
          const decoded = decodeToken(userToken) as {
            id: string;
          };
          console.log({ a: decoded });
          setIsLoggedIn(true);
        } catch (error) {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    verificarAutenticacion();
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/app/dice.ico" />
        <link
          rel="preload"
          href="https://dice-app-nu.vercel.app/_next/static/css/077a8c9a87d2c245.css"
          as="style"
        />
      </head>
      <body>
        <div>
          {isLoggedIn ? (
            <Navbar2
              clientId=""
              isLoggedIn={isLoggedIn}
              onLogout={() => setIsLoggedIn(false)}
            />
          ) : (
            <Navbar />
          )}
          {React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, {
              setIsLoggedIn: setIsLoggedIn,
            })
          )}
        </div>
        <Footer />
      </body>
    </html>
  );
}
