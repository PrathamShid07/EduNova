import "react-native-url-polyfill/auto";
import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { AuthProvider } from "./src/context/AuthContext";
import { EventProvider } from "./src/context/EventContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { spaceTheme } from "./src/styles/theme";
import { LogBox } from "react-native";

// Optional: Fix AsyncStorage polyfill (only if you created the file manually)
try {
  require("./src/polyfills/asyncStorage");
} catch (e) {
  console.warn("Optional polyfill missing: asyncStorage");
}

// Ignore specific warnings (optional)
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const App = () => {
  return (
    <ThemeProvider theme={spaceTheme}>
      <AuthProvider>
        <EventProvider>
          <NotificationProvider>
            <StatusBar
              barStyle="light-content"
              backgroundColor={spaceTheme?.colors?.primary || "#000"}
              translucent={true}
            />
            <AppNavigator />
          </NotificationProvider>
        </EventProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
