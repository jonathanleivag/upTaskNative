import {
  Container,
  Text,
  Form,
  Input,
  Item,
  Button,
  Toast,
  Spinner,
  H2,
  Content,
  List,
  ListItem,
  Left,
  Right,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { color } from "../../assets/style/color";
import { globalStyles } from "../../assets/style/global";

// formik
import { Formik } from "formik";
import * as Yup from "yup";

// apollo
import { useMutation, useQuery } from "@apollo/client";
import {
  NUEVA_TAREA,
  OBTENER_TAREA,
  ACTUALIZAR_TAREA,
  ELIMINAR_TAREA,
} from "../../db/tarea";
import { AntDesign } from "@expo/vector-icons";
// alert
import AwesomeAlert from "react-native-awesome-alerts";

export const ProyectoView = ({ route }) => {
  const { id, nombre } = route.params;
  const [alert, setAlert] = useState(false);
  const [idTarea, setIdTarea] = useState("");

  const { data, loading } = useQuery(OBTENER_TAREA, {
    variables: {
      input: {
        proyecto: id,
      },
    },
  });

  const items = !loading && data.obtenerTarea;

  //   apollo
  const [nuevaTarea] = useMutation(NUEVA_TAREA, {
    update(cache, { data: { nuevaTarea } }) {
      const { obtenerTarea } = cache.readQuery({
        query: OBTENER_TAREA,
        variables: {
          input: {
            proyecto: id,
          },
        },
      });

      cache.writeQuery({
        query: OBTENER_TAREA,
        variables: {
          input: {
            proyecto: id,
          },
        },
        data: { obtenerTarea: [...obtenerTarea, nuevaTarea] },
      });
    },
  });
  const [actulizarTarea] = useMutation(ACTUALIZAR_TAREA);
  const [eliminarTarea] = useMutation(ELIMINAR_TAREA, {
    update(cache) {
      const { obtenerTarea } = cache.readQuery({
        query: OBTENER_TAREA,
        variables: { input: { proyecto: id } },
      });

      cache.writeQuery({
        query: OBTENER_TAREA,
        variables: { input: { proyecto: id } },
        data: {
          obtenerTarea: obtenerTarea.filter(
            (tareaActual) => tareaActual.id !== idTarea
          ),
        },
      });
    },
  });

  // Formik
  const initialValues = { tarea: "" };

  const SignupSchema = () =>
    Yup.object().shape({
      tarea: Yup.string()
        .required("El campo tarea es requerido")
        .min(3, "Minimo 3 caracteres"),
    });

  const handleOnSubmit = async (values) => {
    const { tarea } = values;
    try {
      const { data } = await nuevaTarea({
        variables: {
          input: {
            nombre: tarea,
            proyecto: id,
          },
        },
      });
      Toast.show({ text: "La tarea se creo con exito", buttonText: "Listo" });
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      Toast.show({ text: error.message, buttonText: "Listo" });
    }
  };

  const cambiarEstado = async (item) => {
    const { estado, id, nombre } = item;

    try {
      await actulizarTarea({
        variables: {
          id,
          input: {
            nombre,
          },
          estado: !estado,
        },
      });
    } catch (error) {
      console.error(error);
      Toast.show({ text: error.message, buttonText: "Listo" });
    }
  };

  const showAlert = (id) => {
    setAlert(true);
    setIdTarea(id);
  };

  const cancelAlert = () => {
    setAlert(false);
    setIdTarea("");
  };

  const handleDelete = async () => {
    try {
      const { data } = await eliminarTarea({ variables: { id: idTarea } });
      Toast.show({ text: data.eliminarTarea, buttonText: "Listo" });
      setAlert(false);
    } catch (error) {
      console.error(error);
      setAlert(false);
      setIdTarea("");
      Toast.show({ text: error.message, buttonText: "Listo" });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={handleOnSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Container style={[globalStyles.contenedor, styles.contenedor]}>
          <Form style={styles.form}>
            <Item style={globalStyles.input}>
              <Input
                inlineLabel
                placeholder="Nueva tarea"
                onChangeText={handleChange("tarea")}
                onBlur={handleBlur("tarea")}
                value={values.tarea}
              />
              {errors.tarea && touched.tarea ? (
                <Text style={globalStyles.errorTextForm}>{errors.tarea}</Text>
              ) : null}
            </Item>
            <Button
              onPress={() => {
                handleSubmit();
                // resetForm({ values: { tarea: "" } });
              }}
              block
              style={globalStyles.boton}
            >
              <Text style={globalStyles.botonTexto}>Crear tarea</Text>
            </Button>
          </Form>
          {loading ? (
            <Spinner />
          ) : (
            <Content>
              <H2 style={globalStyles.subtitulo}>Tarea: {nombre}</H2>
              <List style={styles.contenido}>
                {items.map((item) => {
                  const { id, nombre, estado } = item;
                  return (
                    <ListItem
                      key={id}
                      onPress={() => cambiarEstado(item)}
                      onLongPress={() => showAlert(id)}
                    >
                      <Left>
                        <Text>{nombre}</Text>
                      </Left>
                      <Right>
                        {estado ? (
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="green"
                          />
                        ) : (
                          <AntDesign
                            name="checkcircleo"
                            size={24}
                            color="black"
                          />
                        )}
                      </Right>
                    </ListItem>
                  );
                })}
              </List>
            </Content>
          )}
          <AwesomeAlert
            show={alert}
            showProgress={false}
            title="¡Espere!"
            message="¿Estás seguro de que quieres eliminar?"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="¡No!"
            confirmText="¡Si!"
            confirmButtonColor={color.botonCancelar}
            onCancelPressed={cancelAlert}
            onConfirmPressed={handleDelete}
          />
        </Container>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: color.colorLogin,
  },
  form: {
    marginHorizontal: "2.5%",
    marginTop: 20,
  },
  contenido: {
    backgroundColor: color.titulo,
    marginHorizontal: "2.5%",
  },
});
