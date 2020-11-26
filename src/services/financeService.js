import http from "../http-common";

const getClientes = () => {
  return http.get(`${process.env.REACT_APP_URL_API}/clientes`);
};

const saveCliente = (cliente) => {
  return http.post(`${process.env.REACT_APP_URL_API}/saveCliente`, cliente);
};

const saveClienteEmprestimo = (_id, emprestimo) => {
  return http.patch(`${process.env.REACT_APP_URL_API}/saveCliente?cliente=${_id}`, emprestimo);
};


export default { getClientes, saveCliente, saveClienteEmprestimo};
