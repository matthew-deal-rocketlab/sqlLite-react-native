// Theme colors generated from: https://coolors.co/ba1200-031927-9dd1f1-508aa8-c8e0f4

// primary = background
// secondary = text
// tertiary = hightlight

const commonProperties = {
  fontSizes: {
    small: 14,
    medium: 18,
    large: 24,
    extralarge: 32,
  },
  spacing: {
    small: 10,
    medium: 20,
    large: 40,
    extralarge: 60,
  },
  borderRadius: {
    small: 5,
    medium: 10,
    large: 20,
  },
};

export const darkTheme = {
  isDark: true,
  colors: {
    primary: '#031927',
    secondary: '#9dd1f1',
    tertiary: '#508aa8',
    accent: '#ba1200',
    shades: {
      black: '#000000',
      white: '#ffffff',
      neutral: '#808080',
    },
    loadingOverlay: 'rgba(80,80,80,0.8)',
    default: 'black',
    inverse: 'white',
  },
  ...commonProperties,
};

export const lightTheme = {
  isDark: false,
  colors: {
    primary: '#9dd1f1',
    secondary: '#031927',
    tertiary: '#508aa8',
    accent: '#ba1200',
    shades: {
      black: '#000000',
      white: '#ffffff',
      neutral: '#808080',
    },
    loadingOverlay: 'rgba(80,80,80,0.5)',
    default: 'white',
    inverse: 'black',
  },
  ...commonProperties,
};

const appTheme = lightTheme; // set the light theme as the default.
export default appTheme;
export type ThemeType = typeof lightTheme; // This is the type definition for my theme object.
export const TABBAR_HEIGHT = 64;
