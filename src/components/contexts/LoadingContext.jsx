import { useState, createContext } from "react";

export const LoadingContext = createContext();

export const UserProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={(isLoading, setIsLoading)}>
      {props.children}
    </LoadingContext.Provider>
  );
};
