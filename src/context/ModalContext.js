import { createContext, useContext, useState } from "react";

const ModelContext = createContext();

export function ModelContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const state = {
    isOpen,
    setIsOpen,
    form,
    setForm,
    closeModal,
    openModal,
    loading,
    setLoading,
  };
  return <ModelContext.Provider value={state}>{children}</ModelContext.Provider>;
}
export function useModelContext() {
  return useContext(ModelContext);
}
