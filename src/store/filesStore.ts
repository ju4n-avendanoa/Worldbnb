import { Files } from "@/interfaces/formInterface";
import { create } from "zustand";

export const useFilesStore = create<Files>()((set) => ({
  selectedFiles: [],
  setSelectedFiles: (files) =>
    set((state) => ({
      ...state,
      files,
    })),
}));
