import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";

// Navigators
import AuthNavigator from "./AuthNavigator";
import StudentNavigator from "./StudentNavigator";
import ProviderNavigator from "./ProviderNavigator";

const RootStack = createStackNavigator();

const AppNavigator = () => {
  const { userToken, userData, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null; // OR show a splash/loading screen
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!userToken ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : userData?.role === "provider" ? (
          <RootStack.Screen name="Provider" component={ProviderNavigator} />
        ) : (
          <RootStack.Screen name="Student" component={StudentNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
