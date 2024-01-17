import { Error } from "@/interfaces/errorInterface";
import { create } from "zustand";

export const useErrorStore = create<Error>()((set) => ({
  error: false,
  errorMessage: "",
  setError: (error) => set({ error }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
}));
