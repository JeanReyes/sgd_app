/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useAuth } from "../../../hooks/useContext";

interface Props {
  children: JSX.Element;
}

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated) {
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "/auth/login",
          query:
            router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady]);

  if (!checked) {
    return null;
  }

  return children;
};
