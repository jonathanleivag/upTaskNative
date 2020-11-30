const { StyleSheet } = require("react-native");
const { color } = require("./color");

export const globalStyles = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  contenido: {
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: "2.5%",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 32,
    fontWeight: "bold",
    color: color.titulo,
  },
  subtitulo: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 26,
    fontWeight: "bold",
    color: color.titulo,
    marginTop: 20,
  },
  input: {
    backgroundColor: color.titulo,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: color.colorBoton,
  },
  botonTexto: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: color.titulo,
  },
  enlace: {
    color: color.titulo,
    marginTop: 60,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
  },
  errorTextForm: {
    color: color.colorErrorText,
    marginRight: 10,
  },
});
