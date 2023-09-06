"use client";
import React from "react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "./register.css";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data: FieldValues) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        data
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario creado correctamente!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log({ a: response });
      router.push("/login");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: "Ocurrio un error inesperado!",
      });
      console.error(error);
    }
  };

  return (
    <div className="contregistro">
      <form className="form mx-auto" onSubmit={handleSubmit(submit)}>
        <span className="title">Registrate</span>
        <label htmlFor="nombre" className="label">
          Nombre
        </label>
        <input
          type="text"
          id="nombre"
          required={true}
          className="input"
          {...register("nombre", {
            required: true,
          })}
        />{" "}
        {errors.nombre?.type === "required" && (
          <p className="text-danger">El campo nombre es requerido</p>
        )}
        <label htmlFor="Apellido" className="label">
          Apellido
        </label>
        <input
          type="text"
          id="apellido"
          required={true}
          className="input"
          {...register("apellido", {
            required: true,
          })}
        />{" "}
        {errors.apellido?.type === "required" && (
          <p className="text-danger">El campo apellido es requerido</p>
        )}
        <label htmlFor="dni" className="label">
          Dni
        </label>
        <input
          type="text"
          id="dni"
          required={true}
          className="input"
          {...register("dni", {
            required: true,
          })}
        />{" "}
        {errors.dni?.type === "required" && (
          <p className="text-danger">El campo dni es requerido</p>
        )}
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          id="email"
          required={true}
          className="input"
          {...register("email", {
            required: true,
          })}
        />{" "}
        {errors.email?.type === "required" && (
          <p className="text-danger">El campo email es requerido</p>
        )}
        <label htmlFor="Apellido" className="label">
          Teléfono
        </label>
        <input
          type="text"
          id="telefono"
          required={true}
          className="input"
          {...register("telefono", {
            required: true,
          })}
        />{" "}
        {errors.telefono?.type === "required" && (
          <p className="text-danger">El campo teléfono es requerido</p>
        )}
        <label htmlFor="contraseña" className="label">
          Contraseña
        </label>
        <input
          type="contraseña"
          id="contraseña"
          required={true}
          className="input"
          {...register("contraseña", {
            required: true,
          })}
        />{" "}
        {errors.contraseña?.type === "required" && (
          <p className="text-danger">El campo contraseña es requerido</p>
        )}
        <input
          type="password"
          placeholder="Reingrese su contraseña"
          className="input"
          {...register("confirmarContraseña", {
            required: true,
            validate: (value) =>
              value === watch("contraseña") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmarContraseña && (
          <p className="text-danger">"Las contraseñas no coinciden"</p>
        )}
        <button type="submit" className="submit mt-5">
          Crea tu cuenta
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
