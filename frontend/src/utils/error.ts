export const parseError = (error: any): string => {
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  return "Error inesperado del servidor.";
};
