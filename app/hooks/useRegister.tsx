import { create } from "zustand";

interface RegisterProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export const useRegister = create<RegisterProps>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
