import React, { Component } from "react";
import { formataMascara } from "../../helpers/financiarController";

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
                <th>Emprestimos</th>
              </tr>
            </thead>

            <tbody>
              {clientes.map(
                ({
                  id,
                  nome,
                  sobrenome,
                  cpf,
                  salario,
                  situacao,
                  emprestimos,
                }) => {
                  return (
                    <tr key={id}>
                      <td>
                        {nome} {sobrenome}
                      </td>
                      <td>{cpf}</td>
                      <td>{formataMascara("BRL", salario)}</td>
                      <td>{situacao}</td>
                      <td>
                        {formataMascara(
                          "BRL",
                          emprestimos.reduce((acc, cur) => {
                            return acc + cur.valorEmprestimoMes;
                          }, 0)
                        )}
                      </td>
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
