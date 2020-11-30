import { gql } from "@apollo/client";

export const NUEVA_TAREA = gql`
  mutation nuevaTarea($input: TareaInput) {
    nuevaTarea(input: $input) {
      id
      nombre
      proyecto
      estado
    }
  }
`;

export const OBTENER_TAREA = gql`
  query obtenerTarea($input: ProyectoIDInput) {
    obtenerTarea(input: $input) {
      nombre
      id
      proyecto
      estado
    }
  }
`;

export const ACTUALIZAR_TAREA = gql`
  mutation actulizarTarea($id: ID!, $input: TareaInput, $estado: Boolean) {
    actulizarTarea(id: $id, input: $input, estado: $estado) {
      nombre
      id
      proyecto
      estado
    }
  }
`;

export const ELIMINAR_TAREA = gql`
  mutation eliminarTarea($id: ID!) {
    eliminarTarea(id: $id)
  }
`;
