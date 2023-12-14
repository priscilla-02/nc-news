import { useContext } from "react";
import { ErrorContext } from "../contexts/ErrorHandlingContext";

const ErrorHandling = () => {
  const { errMsg } = useContext(ErrorContext);
  return <div>{errMsg}</div>;
};

export default ErrorHandling;
