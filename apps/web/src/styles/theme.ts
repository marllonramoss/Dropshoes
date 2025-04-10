/**
 * Sistema de design do DropShoes
 * Este arquivo contém as constantes de estilo para uso consistente em toda a aplicação
 */

export const colors = {
  // Paleta Zinc
  white: "#ffffff",
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },

  // Cores de ação
  red: {
    500: "#ef4444",
    600: "#dc2626",
  },
  green: {
    500: "#22c55e",
    600: "#16a34a",
  },
  blue: {
    500: "#3b82f6",
    600: "#2563eb",
  },
  amber: {
    500: "#f59e0b",
    600: "#d97706",
  },
};

// Tamanhos de fonte
export const fontSizes = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  base: "1rem", // 16px
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
};

// Pesos de fonte
export const fontWeights = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

// Espaçamento
export const spacing = {
  0: "0",
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  12: "3rem", // 48px
  16: "4rem", // 64px
};

// Arredondamentos
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px", // Circular
};

// Sombras
export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
};

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Estilos de componentes comuns
export const componentStyles = {
  // Botões
  button: {
    primary: `bg-zinc-950 text-white px-4 py-2 rounded-md hover:bg-zinc-900 transition-colors`,
    secondary: `bg-white text-zinc-950 border border-zinc-200 px-4 py-2 rounded-md hover:bg-zinc-50 transition-colors`,
    text: `text-zinc-700 hover:text-zinc-950 font-medium transition-colors`,
  },

  // Inputs
  input: {
    default: `w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent`,
  },

  // Containers
  container: {
    default: `container mx-auto px-4 sm:px-6 lg:px-8`,
  },

  // Cards
  card: {
    default: `bg-white rounded-lg shadow p-4`,
    hover: `hover:shadow-md transition-shadow`,
  },
};
