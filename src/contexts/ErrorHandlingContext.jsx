import { useState, createContext, useEffect } from "react";
import { ErrorPath } from "../api";

export const ErrorContext = createContext();

export const ErrorProvider = (props) => {
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    ErrorPath()
      .then(() => {})
      .catch((error) => {
        setErrMsg(error.response.data.message);
      });
  }, []);

  return (
    <ErrorContext.Provider value={{ errMsg, setErrMsg }}>
      {props.children}
    </ErrorContext.Provider>
  );
};
