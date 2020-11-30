import React, { useEffect, useState, Fragment } from "react";

// react native
import { BackHandler, Platform } from "react-native";

// navigations
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

import { color } from "../../assets/style/color";

// views
import { LoginView } from "../views/LoginView";
import { CrearUsuarioView } from "../views/CrearUsuarioView";
import { ProyectosView } from "../views/ProyectosView";
import { ProyectoView } from "../views/ProyectoView";
import { NuevoProyectoView } from "../views/NuevoProyectoView";

// alert
import AwesomeAlert from "react-native-awesome-alerts";
import { BotonLogout } from "../ui/BotonLogout";

export const RoutesApp = () => {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    }
  }, []);

  const backAction = () => {
    setAlert(true);
    return true;
  };

  return (
    <Fragment>
      <AwesomeAlert
        show={alert}
        showProgress={false}
        title="¡Espere!"
        message="¿Estás seguro de que quieres salir?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="¡No!"
        confirmText="¡Si!"
        confirmButtonColor={color.botonCancelar}
        onCancelPressed={() => setAlert(false)}
        onConfirmPressed={() => BackHandler.exitApp()}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginView"
          screenOptions={{
            headerTitleAlign: "center",
            headerRight: () => <BotonLogout />,
          }}
        >
          <Stack.Screen
            name="LoginView"
            component={LoginView}
            options={{ title: "Iniciar sesion", headerShown: false }}
          />

          <Stack.Screen
            name="CrearUsuarioView"
            component={CrearUsuarioView}
            options={{
              title: "Crear usuario",
              headerStyle: { backgroundColor: color.colorBoton },
              headerTintColor: color.titulo,
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />

          <Stack.Screen
            name="ProyectosView"
            component={ProyectosView}
            options={{
              title: "Proyectos",
              headerStyle: { backgroundColor: color.colorBoton },
              headerTintColor: color.titulo,
              headerTitleStyle: { fontWeight: "bold" },
              headerLeft: null,
            }}
          />

          <Stack.Screen
            name="ProyectoView"
            component={ProyectoView}
            options={({ route }) => {
              const { nombre } = route.params;
              return {
                title: nombre,
                headerStyle: { backgroundColor: color.colorBoton },
                headerTintColor: color.titulo,
                headerTitleStyle: { fontWeight: "bold" },
              };
            }}
          />

          <Stack.Screen
            name="NuevoProyectoView"
            component={NuevoProyectoView}
            options={{
              title: "Nuevo proyecto",
              headerStyle: { backgroundColor: color.colorBoton },
              headerTintColor: color.titulo,
              headerTitleStyle: { fontWeight: "bold" },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
};
