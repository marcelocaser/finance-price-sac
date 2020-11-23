import React, { Component } from "react";

export default class ListaClientes extends Component {
  render() {
    const { clientes } = this.props;
    return (
      <div className="row">
        <div className="col s12">
          Cliente com empréstimos contratados:
          <table className="striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Salário</th>
                <th>Situação</th>
              </tr>
            </thead>

            <tbody>
              {clientes.map(
                ({ id, nome, sobrenome, cpf, salario, situacao }) => {
                  return (
                    <tr key={id}>
                      <td>
                        {nome} {sobrenome}
                      </td>
                      <td>{cpf}</td>
                      <td>{salario}</td>
                      <td>{situacao}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
