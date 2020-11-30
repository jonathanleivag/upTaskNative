import React from "react";
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

//Formik
import { Formik } from "formik";
import * as Yup from "yup";

// apollo
import { useMutation } from "@apollo/client";

// gql
import { NUEVA_CUENTA } from "../../db/user";

export const CrearUsuarioView = () => {
  // navegacion
  const { navigate } = useNavigation();

  // apollo

  const [crearUsuario] = useMutation(NUEVA_CUENTA);

  // Formik
  const initialValues = { nombre: "", email: "", password: "" };

  const handlerSubmit = async (values) => {
    const { nombre, email, password } = values;
    try {
      const { data } = await crearUsuario({
        variables: {
          input: {
            nombre,
            email,
            password,
          },
        },
      });

      Toast.show({
        text: data.crearUsuario,
        buttonText: "Listo",
        duration: 5000,
      });
      navigate("LoginView");
    } catch (error) {
      console.error(error);
      Toast.show({
        text: error.message,
        buttonText: "Listo",
        duration: 5000,
      });
    }
  };

  const SignupSchema = () =>
    Yup.object().shape({
      nombre: Yup.string()
        .min(2, "Tiene que ser un nombre mas largo")
        .required("El campo nombre es requerido"),
      email: Yup.string()
        .email("Email invalido")
        .required("El campo email es requerido"),
      password: Yup.string()
        .min(6, "La password tiene que ser mas larga")
        .required("El campo password es requerido"),
    });

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
                  placeholder="Nombre"
                  onChangeText={handleChange("nombre")}
                  onBlur={handleBlur("nombre")}
                  value={values.nombre}
                />
                {errors.nombre && touched.nombre ? (
                  <Text style={globalStyles.errorTextForm}>
                    {errors.nombre}
                  </Text>
                ) : null}
              </Item>
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
            <Button onPress={handleSubmit} block style={globalStyles.boton}>
              <Text style={globalStyles.botonTexto}>Crear cuenta</Text>
            </Button>
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
