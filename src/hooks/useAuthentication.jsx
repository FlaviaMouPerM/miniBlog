import { db } from "../firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect, useRef } from "react";
import { data } from "react-router-dom";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  //deal with memory leak
  const cancelled = useRef(false);

  const auth = getAuth();

  useEffect(() => {
    cancelled.current = false;

    return () => {
      cancelled.current = true;
    };
  }, []);

  function checkIfIsCancelled() {
    if (cancelled.current) {
      return;
    }
  }
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });

      //setLoading(false);

      return user;
    } catch (error) {
      //quando entra aqui error nao funciona

      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;

      switch (error.code) {
        case "auth/weak-password":
          systemErrorMessage =
            "Senha fraca. A senha precisa de pelo menos 6 caracteres.";
          break;

        case "auth/email-already-in-use":
          systemErrorMessage = "E-mail já cadastrado.";
          break;

        case "auth/invalid-email":
          systemErrorMessage = "O e-mail introduzido não é válido.";
          break;

        case "auth/operation-not-allowed":
          systemErrorMessage =
            "O registo por e-mail e senha não está ativado no Firebase.";
          break;

        default:
          systemErrorMessage =
            "Ocorreu um erro. Por favor, tenta novamente mais tarde.";
      }
      if (!cancelled.current) {
        setError(systemErrorMessage);
      }
      return null;
    } finally {
      if (!cancelled.current) {
        setLoading(false);
      }
    }
  };

  // login  - sing In

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "User not found";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Wrong Password";
      } else {
        systemErrorMessage = "An error occurred. Please try again later.";
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      cancelled.current = true;
    };
  }, []);
  return {
    auth,
    createUser,
    error,
    loading,
    login,
  };
};
