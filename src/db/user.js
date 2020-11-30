import { gql } from "@apollo/client";

export const NUEVA_CUENTA = gql`
  mutation crearUsuario($input: UsuarioInput) {
    crearUsuario(input: $input)
  }
`;

export const AUTHENTICAR_USUARIO = gql`
  mutation authenticaUsuario($input: AuthenticaUsuario) {
    authenticaUsuario(input: $input) {
      token
    }
  }
`;
