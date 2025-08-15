import { useColorScheme as _useColorScheme } from "react-native";
import { useState } from "react";
import { colors } from "@/constants/colors";

// TODO: remove this global variable and use a Redux

type Theme = "light" | "dark";

let globalTheme: Theme | null = null;

const useColorScheme = () => {
  const systemTheme = _useColorScheme();
  const [selectedTheme, setTheme] = useState<Theme>(
    globalTheme || systemTheme || "light"
  );

  const toggleTheme = () => {
    const newTheme = selectedTheme === "light" ? "dark" : "light";
    globalTheme = newTheme;
    setTheme(newTheme);
  };

  return {
    selectedTheme,
    colors: colors[selectedTheme],
    toggleTheme,
  };
};

export default useColorScheme;
