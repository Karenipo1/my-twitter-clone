"use client";
import { createContext, useState, useContext } from "react";

const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => setRefreshFlag((prev) => !prev);

  return (
    <TweetContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </TweetContext.Provider>
  );
};
export const useTweetContext = () => useContext(TweetContext);