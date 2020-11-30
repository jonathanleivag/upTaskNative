import { gql } from "@apollo/client";

export const NUEVO_PROYECTO = gql`
  mutation nuevoProyecto($input: ProyectoInput) {
    nuevoProyecto(input: $input) {
      nombre
      id
      resp
    }
  }
`;

export const OBTENER_PROYECTO = gql`
  query obtenerProyecto {
    obtenerProyecto {
      nombre
      id
    }
  }
`;
