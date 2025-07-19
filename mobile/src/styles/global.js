import { createGlobalStyle } from 'styled-components/native';

export const GlobalStyle = createGlobalStyle`
  /* Base reset for all elements */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* React Native specific elements */
  Text {
    font-family: ${props => props.theme.fonts.main};
    color: ${props => props.theme.colors.text};
    include-font-padding: false;
    text-align-vertical: center;
  }

  View, ScrollView {
    background-color: ${props => props.theme.colors.background};
  }

  /* Status bar styling */
  StatusBar {
    background-color: ${props => props.theme.colors.primary};
  }
`;