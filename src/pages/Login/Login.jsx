import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../admin/components/Input/Input";
import { Button } from "../../components/Button/Button";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../admin/redux/features/auth/authThunk";
import { fetchFavorites } from "../../admin/redux/features/favorites/favoritesThunk";
import { getReviewedPackageIdsByUser } from "../../admin/redux/features/review/reviewThunk";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const { token, user, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginThunk(userLogin));

    if (loginThunk.fulfilled.match(resultAction)) {
      dispatch(fetchFavorites());
      dispatch(getReviewedPackageIdsByUser());

      const reserve = JSON.parse(localStorage.getItem("reservaPendiente"))
      if (reserve) {
        navigate(`/reservar/${reserve.productId}`, { state: reserve })
        localStorage.removeItem("reservaPendiente")
      } else {
        navigate("/")
      }
    }
  }


  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <AuthLayout
      title="Iniciar Sesión"
      formContainerClass={styles.formContainer}
    >
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
      <Button
        text="Ingresar"
        className={styles.buttonLogin}
        onClick={handleLogin}
        id="loginButton"
      />
      <p className={styles.registerMessage}>
        ¿No tienes una cuenta?{" "}
        <Link to="/registro" className={styles.btnRegister}>
          Registrate
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
