import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../admin/components/Input/Input";
import { Button } from "../../components/Button/Button";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../admin/redux/features/auth/authThunk";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  })
  
  const {token, user, error} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserLogin((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(loginThunk(userLogin))
  }

  useEffect(() => {
    if(token) {
      navigate("/")
    }
  }, [token, navigate])
  

  return (
      <AuthLayout title = "Iniciar Sesión" formContainerClass={styles.formContainer}>
        <Input
          htmlFor="email"
          labelName="Email"
          placeholder="Ingrese su email"
          type="text"
          value={userLogin.email}
          inputName="email"
          onChange={handleChange}
          id="email"
        />
        <Input
          htmlFor="password"
          labelName="Contraseña"
          placeholder="Ingrese su contraseña"
          type="password"
          value={userLogin.password}
          inputName="password"
          onChange={handleChange}
          id="password"
        />
        {error && <p className={styles.error}>Credenciales inválidas</p>}
        <Button text="Ingresar" className={styles.buttonLogin} onClick={handleLogin}/>
        <p className={styles.registerMessage}>
          ¿No tienes una cuenta?{" "}
          <Link
            to="/registro"
            className={styles.btnRegister}
          >
            Registrate
          </Link>
        </p>
      </AuthLayout>
  );
};

export default Login;
