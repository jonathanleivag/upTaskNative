import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Text,
  H1,
  Form,
  Item,
  Input,
  Button,
  Toast,
} from "native-base";
import { globalStyles } from "../../assets/style/global";
import { color } from "../../assets/style/color";

// formik
import { Formik } from "formik";
import * as Yup from "yup";

// navigation
import { useNavigation } from "@react-navigation/native";

// apollo
import { useMutation } from "@apollo/client";
import { NUEVO_PROYECTO, OBTENER_PROYECTO } from "../../db/proyecto";

export const NuevoProyectoView = () => {
  // Formik
  const initialValues = { proyecto: "" };

  const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
    update(cache, { data: { nuevoProyecto } }) {
      const { obtenerProyecto } = cache.readQuery({ query: OBTENER_PROYECTO });
      cache.writeQuery({
        query: OBTENER_PROYECTO,
        data: { obtenerProyecto: obtenerProyecto.concat([nuevoProyecto]) },
      });
    },
  });

  const { navigate } = useNavigation();

  const SignupSchema = () =>
    Yup.object().shape({
      proyecto: Yup.string()
        .required("El campo email es requerido")
        .min(3, "Minimo 3 caracteres"),
    });

  const handleOnSubmit = async (values) => {
    const { proyecto } = values;
    try {
      const { data } = await nuevoProyecto({
        variables: {
          input: {
            nombre: proyecto,
          },
        },
      });

      const { resp } = data.nuevoProyecto;

      Toast.show({ text: resp, buttonText: "Listo" });

      navigate("ProyectosView");
    } catch (error) {
      console.error(error);
      Toast.show({ text: error.message, buttonText: "Listo" });
    }
  };

  return (
    <Container style={[globalStyles.contenedor, styles.contenedor]}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleOnSubmit}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={globalStyles.contenido}>
            <H1 style={globalStyles.subtitulo}>Crear proyecto</H1>
            <Form>
              <Item style={globalStyles.input} inlineLabel>
                <Input
                  placeholder="Nombre de proyecto"
                  onChangeText={handleChange("proyecto")}
                  onBlur={handleBlur("proyecto")}
                  value={values.proyecto}
                />
                {errors.proyecto && touched.proyecto ? (
                  <Text style={globalStyles.errorTextForm}>
                    {errors.proyecto}
                  </Text>
                ) : null}
              </Item>
            </Form>
            <Button
              block
              style={[globalStyles.boton, styles.boton]}
              onPress={handleSubmit}
            >
              <Text style={globalStyles.botonTexto}>Nuevo proyecto</Text>
            </Button>
          </View>
        )}
      </Formik>
    </Container>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: color.colorLogin,
  },
  boton: {
    marginTop: 30,
  },
});
