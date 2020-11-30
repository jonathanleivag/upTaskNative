import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Container,
  H2,
  Text,
  Spinner,
  List,
  ListItem,
  Left,
  Right,
  Content,
} from "native-base";
import { color } from "../../assets/style/color";
import { globalStyles } from "../../assets/style/global";

// apollo
import { OBTENER_PROYECTO } from "../../db/proyecto";
import { useQuery } from "@apollo/client";

// navegacion
import { useNavigation } from "@react-navigation/native";

export const ProyectosView = () => {
  // navegacion
  const { navigate } = useNavigation();

  const { data, loading } = useQuery(OBTENER_PROYECTO);

  const items = !loading && data.obtenerProyecto;

  return (
    <Container style={[globalStyles.contenedor, styles.contenedor]}>
      <Button
        block
        style={[globalStyles.boton, styles.boton]}
        onPress={() => navigate("NuevoProyectoView")}
      >
        <Text style={globalStyles.botonTexto}>Nuevo proyecto</Text>
      </Button>
      {loading ? (
        <Spinner />
      ) : (
        <Content>
          <H2 style={globalStyles.subtitulo}>Seleccionar un proyecto</H2>
          <List style={styles.contenido}>
            {items.map((item) => {
              const { nombre, id } = item;
              return (
                <ListItem
                  key={id}
                  onPress={() => navigate("ProyectoView", item)}
                >
                  <Left>
                    <Text>{nombre}</Text>
                  </Left>
                  <Right></Right>
                </ListItem>
              );
            })}
          </List>
        </Content>
      )}
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
  contenido: {
    backgroundColor: color.titulo,
    marginHorizontal: "2.5%",
  },
});
