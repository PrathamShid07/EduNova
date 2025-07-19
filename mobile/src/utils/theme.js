// src/utils/theme.js
import { spaceTheme } from './colors';

export const theme = {
  colors: spaceTheme,
  fonts: {
    regular: 'Roboto-Regular',
    bold: 'Roboto-Bold',
    light: 'Roboto-Light'
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    xlarge: 16
  }
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#000011',
    cardBackground: '#0A0A2A'
  }
};