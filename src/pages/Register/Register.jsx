import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "../../admin/components/Input/Input";
import { registerThunk } from "../../admin/redux/features/auth/authThunk";
import { Button } from "../../components/Button/Button";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import styles from "./Register.module.css";

const Register = () => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [registerUser, setRegisterUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, lastname, email, password } = registerUser;
    if (!name || !lastname || !email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
      return;
    }
    setError("");
    dispatch(registerThunk(registerUser));
    navigate('/')
  };

  return (
    <AuthLayout title="Registrate" formContainerClass={styles.formContainer}>
      {/* <h2 className={styles.title}>¡La Aventura Te Espera!</h2> */}
      <Input
        htmlFor="nombre"
        labelName="Nombre"
        placeholder="Ingrese su nombre"
        type="text"
        value={registerUser.name}
        inputName="name"
        onChange={handleChange}
        id="name"
      />
      <Input
        htmlFor="apellido"
        labelName="Apellido"
        placeholder="Ingrese su apellido"
        type="text"
        value={registerUser.lastname}
        inputName="lastname"
        onChange={handleChange}
        id="lastname"
      />
      <Input
        htmlFor="email"
        labelName="Email"
        placeholder="Ingrese su email"
        type="text"
        value={registerUser.email}
        inputName="email"
        onChange={handleChange}
        id="email"
      />
      <Input
        htmlFor="contraseña"
        labelName="Contraseña"
        placeholder="Ingrese su contraseña"
        type="password"
        value={registerUser.password}
        inputName="password"
        onChange={handleChange}
        id="password"
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
      <Button
        text="Registrarme"
        className={styles.button}
        onClick={handleRegister}
      />
    </AuthLayout>
  );
};

export default Register;
