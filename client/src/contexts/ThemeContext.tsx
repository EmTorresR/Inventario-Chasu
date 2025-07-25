// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define la forma del contexto de tema
interface ThemeContextValue {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Inicializa el contexto como undefined para detectar usos fuera del proveedor
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Proveedor de tema que gestiona estado, localStorage y la clase `dark` en <html>
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return JSON.parse(stored);
    }
    // Si no hay valor en localStorage, respetar la preferencia del sistema
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Sincroniza con localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    // Añade o quita la clase `dark` en <html>
    document.documentElement.classList[darkMode ? 'add' : 'remove']('dark');
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook para consumir el contexto de tema y garantizar que exista un proveedor
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return context;
};

