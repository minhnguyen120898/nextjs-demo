import { createContext, useState } from "react";
import { LayoutProps } from "../models";

export const LoadingContext = createContext({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {}
});

export function LoadingProvider ({children} : LayoutProps) {
  const [loading, setLoading] = useState(false);
  function showLoading() {
    if (loading) {
      return;
    }
    setLoading(true);
  }

  function hideLoading() {      
    setLoading(false);
  }

  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoading,
        hideLoading
      }}
    >
      { children }
    </LoadingContext.Provider>
  )
}