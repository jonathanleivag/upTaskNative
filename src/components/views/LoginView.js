import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";

import {
  Text,
  Container,
  Button,
  H1,
  Input,
  Form,
  Item,
  Toast,
} from "native-base";
// styles
import { globalStyles } from "../../assets/style/global";
import { color } from "../../assets/style/color";

// navegacion
import { useNavigation } from "@react-navigation/native";

// formik
import { Formik } from "formik";
import * as Yup from "yup";

// apollo
import { useMutation } from "@apollo/client";

// gql
import { AUTHENTICAR_USUARIO } from "../../db/user";

// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginView = () => {
  // navegacion
  const { navigate } = useNavigation();

  // useEffect(() => {
  //   const login = async () => {
  //     const value = await AsyncStorage.getItem("@token");
  //     if (value) {
  //       navigate("ProyectosView");
  //     }
  //   };
  //   login();
  // }, []);

  // apollo

  const [authenticaUsuario] = useMutation(AUTHENTICAR_USUARIO);

  // Formik
  const initialValues = { email: "", password: "" };

  const SignupSchema = () =>
    Yup.object().shape({
      email: Yup.string().required("El campo email es requerido"),
      password: Yup.string().required("El campo password es requerido"),
    });

  const handlerSubmit = async (values) => {
    const { email, password } = values;

    try {
      const { data } = await authenticaUsuario({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      const { token } = data.authenticaUsuario;

      // AsyncStorage
      await AsyncStorage.setItem("@token", token);

      navigate("ProyectosView");
    } catch (error) {
      console.error(error);
      Toast.show({
        text: error.message,
        buttonText: "Listo",
        duration: 5000,
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handlerSubmit}
      validationSchema={SignupSchema}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <Container style={[styles.container, globalStyles.contenedor]}>
          <View style={globalStyles.contenido}>
            <H1 style={globalStyles.titulo}>UpTask</H1>
            <Form>
              <Item inlineLabel last style={globalStyles.input}>
                <Input
                  placeholder="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email ? (
                  <Text style={globalStyles.errorTextForm}>{errors.email}</Text>
                ) : null}
              </Item>
              <Item inlineLabel last style={globalStyles.input}>
                <Input
                  placeholder="password"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                {errors.password && touched.password ? (
                  <Text style={globalStyles.errorTextForm}>
                    {errors.password}
                  </Text>
                ) : null}
              </Item>
            </Form>
            <Button block style={globalStyles.boton} onPress={handleSubmit}>
              <Text style={globalStyles.botonTexto}>Iniciar sesión</Text>
            </Button>
            <Text
              style={globalStyles.enlace}
              onPress={() => navigate("CrearUsuarioView")}
            >
              Crear cuenta
            </Text>
          </View>
        </Container>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.colorLogin,
  },
});
