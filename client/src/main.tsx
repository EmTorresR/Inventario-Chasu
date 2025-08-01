import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Importa el archivo que contiene los estilos globales
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
