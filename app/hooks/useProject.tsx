import { create } from "zustand";
import { SafeProject } from "../types";

interface ProjectProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useProject = create<ProjectProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
