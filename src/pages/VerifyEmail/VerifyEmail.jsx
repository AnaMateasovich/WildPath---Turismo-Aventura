import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { verifyEmailThunk } from "../../admin/redux/features/auth/authThunk";
import { AuthLayout } from "../../layouts/AuthLayout/AuthLayout";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const token = searchParams.get("token");

  const { verifyMessage, loading, error } = useSelector((state) => state.auth);


  useEffect(() => {
    if (token) {
      dispatch(verifyEmailThunk(token));
    } else {
      console.error("No token in URL");
    }
  }, [token, dispatch]);

  return (
    <AuthLayout title="Registrate" formContainerClass={styles.formContainer}>
      {loading && <p>Verifying...</p>}
      {verifyMessage && (
        <div>
          <p>{verifyMessage}</p>
          <p>Ir al <strong><Link to="/login">Login</Link></strong></p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </AuthLayout>
  );
};

export default VerifyEmail;
