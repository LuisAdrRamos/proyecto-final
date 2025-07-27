export type Usuario = {
  id?: number;
  username: string;
  password: string;
};
export type UsuarioRegistro = {
  username: string;
  password: string;
};
export type UsuarioLogin = {
  username: string;
  password: string;
};
export type UsuarioActualizacion = {
  username?: string;
  password?: string;
};
export type UsuarioResponse = {
  id: number;
  username: string;
  token: string;
};
export type UsuarioError = {
  error: string;
};
export type UsuarioListResponse = UsuarioResponse[];
export type UsuarioDeleteResponse = {
    message: string;
    };
    export type UsuarioUpdateResponse = {
        message: string;
    };
export type UsuarioRegistrarResponse = {
    message: string;
    usuario: UsuarioResponse;
};
export type UsuarioLoginResponse = {
    message: string;
    usuario: UsuarioResponse;
};
export type UsuarioDisponibilidadResponse = {
  disponible: boolean;
  mensaje?: string;
};
export type UsuarioDisponibilidadError = {
  error: string;
};      
export type UsuarioDisponibilidad = {
  codigo: string;
};