import React, { useEffect, useReducer, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { useAuth } from "../../hooks/useContext";
import { User } from "../../interface/Auth";
import { AuthReducer } from "./AuthReducer";

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User;
}

const SGD_INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: {} as User,
};

interface Props {
  children: JSX.Element;
}

export type ResisterProps = {
  correo: string;
  nombres: string;
  dni: string;
  apellidos: string;
  password: string;
  role: string;
};

export const AuthProvider = ({ children }: Props) => {
  const [stateAuth, dispatch] = useReducer(AuthReducer, SGD_INITIAL_STATE);
  const initialized = useRef(false);
  const loged = useRef(
    (typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("authenticated") as string)
      : null) !== null
      ? true
      : false
  );

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.localStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      //aqui hacer la autenticacion
      const user: User = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/avatar-anika-visser.png",
        name: "Jean Reyes",
        email: "nes@company.cl",
      };

      dispatch({
        type: "init-login",
        payload: user,
      });
    } else {
      dispatch({
        type: "init-login",
      });
    }
  };

  const signIn = async (rut: string, password: string) => {
    const data = {
      rut,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/authenticate`,
        {
          method: "POST", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Indica el tipo de contenido que se está enviando
          },
          body: JSON.stringify(data),
        }
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }

      const userLoged = await response.json(); // Aquí asumimos que la respuesta es un objeto JSON
      window.localStorage.setItem("authenticated", "true");
      const user: User = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/avatar-anika-visser.png",
        name: "Jean Reyes",
        email: "nes@company.cl",
      };

      dispatch({
        type: "sign-in",
        payload: user,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = () => {
    window.localStorage.removeItem("authenticated");
    dispatch({
      type: "sing-out",
    });
  };

  const resisterUser = async (data: ResisterProps) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
        {
          method: "POST", // Método HTTP
          headers: {
            "Content-Type": "application/json", // Indica el tipo de contenido que se está enviando
          },
          body: JSON.stringify(data),
        }
      );
      if (!response) {
        throw new Error("Network response was not ok");
      }

      const userRegister = await response.json();
      console.log({ userRegister });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...stateAuth,
        signIn,
        signOut,
        resisterUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
