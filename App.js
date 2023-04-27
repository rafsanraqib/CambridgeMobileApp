import React from "react";
import RidesList from "./Components/RidesList";
import LoginForm from "./Components/LoginForm";
import TaskPrompt from "./Components/TaskPrompt";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginForm}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen name="Task Prompt" component={TaskPrompt} />
        <Stack.Screen name="Tasks" component={RidesList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
