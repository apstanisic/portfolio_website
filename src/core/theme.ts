import create from "zustand";
import { storage } from "./storage";

/**
 * Available themes
 */
type Theme = "dark" | "light";

/**
 * Initial theme stored in db (default to light)
 */
const dbTheme = storage.get("theme") ?? "light";

/**
 * Theme state
 */
interface ThemeState {
  value: Theme;
  toggle: () => void;
}

/**
 * Theme hook
 */
export const [useTheme] = create<ThemeState>((set) => {
  return {
    value: dbTheme,
    toggle: () => {
      set((state) => {
        const newTheme = state.value === "dark" ? "light" : "dark";
        storage.set("theme", newTheme);
        return { value: newTheme };
      });
    },
  };
});