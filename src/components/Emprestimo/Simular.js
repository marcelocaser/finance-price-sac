import M from "materialize-css";
import React, { Component } from "react";
import { formataMascara } from "../../helpers/financiarController";

export default class Simular extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  handleButtonContratarEmprestimo = () => {
    const emprestimoContratado = true;
    this.props.onClickContratarEmprestimo(emprestimoContratado);
  };

  render() {
    const { simulacaoFinanciamento } = this.props;
    const {
      financiarPrice,
      totalPagoPrice,
      totalJurosPrice,
      listaSac,
      listaPrice,
      totalPagoSac,
      totalJurosSac,
    } = simulacaoFinanciamento;
    return (
      <>
        <ul className="expandable collapsible">
          <li className="active">
            <div className="collapsible-header">
              <i className="material-icons">monetization_on</i>Simulação PRICE
            </div>
            <div className="collapsible-body">
              <table className="striped">
                <thead>
                  <tr>
                    <th>Parcela</th>
                    <th>Prestação</th>
                    <th>Amortização</th>
                    <th>Juros</th>
                    <th>Saldo Devedor</th>
                  </tr>
                </thead>

                <tbody>
                  {listaPrice.map(
                    ({
                      numeroPrestacao,
                      valorPrestacao,
                      juros,
                      amortizacao,
                      saldoDevedor,
                    }) => {
                      return (
                        <tr key={numeroPrestacao}>
                          <td>{numeroPrestacao}</td>
                          <td>{formataMascara("BRL", valorPrestacao)}</td>
                          <td>{formataMascara("BRL", amortizacao)}</td>
                          <td>{formataMascara("BRL", juros)}</td>
                          <td>{formataMascara("BRL", saldoDevedor)}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              <p>
                Valor da Prestação é:
                <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  {formataMascara("BRL", financiarPrice)}
                </span>
              </p>
              <p>
                Valor Total do Financiamento Pago é:
                <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  {formataMascara("BRL", totalPagoPrice)}
                </span>
              </p>
              <p>
                Valor Total de Juros Pago é:
                <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  {formataMascara("BRL", totalJurosPrice)}
                </span>
              </p>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons">timeline</i>Simulação SAC
            </div>
            <div className="collapsible-body">
              <table className="striped">
                <thead>
                  <tr>
                    <th>Parcela</th>
                    <th>Prestação</th>
                    <th>Amortização</th>
                    <th>Juros</th>
                    <th>Saldo Devedor</th>
                  </tr>
                </thead>

                <tbody>
                  {listaSac.map(
                    ({
                      numeroPrestacao,
                      valorPrestacao,
                      juros,
                      amortizacao,
                      saldoDevedor,
                    }) => {
                      return (
                        <tr key={numeroPrestacao}>
                          <td>{numeroPrestacao}</td>
                          <td>{formataMascara("BRL", valorPrestacao)}</td>
                          <td>{formataMascara("BRL", amortizacao)}</td>
                          <td>{formataMascara("BRL", juros)}</td>
                          <td>{formataMascara("BRL", saldoDevedor)}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              <p>
                Valor Total do Financiamento Pago é:
                <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  {formataMascara("BRL", totalPagoSac)}
                </span>
              </p>
              <p>
                Valor Total de Juros Pago é:
                <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  {formataMascara("BRL", totalJurosSac)}
                </span>
              </p>
            </div>
          </li>
        </ul>
        <div className="row">
          <div className="col s6">
            <button
              className="btn waves-effect waves-light"
              onClick={this.handleButtonContratarEmprestimo}
            >
              Contratar Empréstimo
              <i className="material-icons right">check</i>
            </button>
          </div>
        </div>
      </>
    );
  }
}
