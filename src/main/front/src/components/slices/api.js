export const url = "http://localhost:8080/api/auth";

export const setHeaders = () => {
  const headers = {
    headers: {
      "Bearer ": localStorage.getItem("token"),
      
    },
  };

  return headers;
};