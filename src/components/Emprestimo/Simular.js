import M from "materialize-css";
import React, { Component } from "react";
import { formataMascara } from "../../helpers/financiarController";

export default class Simular extends Component {
  constructor() {
    super();

    this.state = { emprestimoContratado: false, emprestimoSelecionado: false };
  }
  componentDidMount() {
    M.AutoInit();
  }

  handleClickContratarEmprestimo = () => {
    const { emprestimoContratado } = this.state;
    this.props.onClickContratarEmprestimo(emprestimoContratado);
  };

  handleChangeTipoEmprestimo = (event) => {
    const emprestimoContratado = event.target.value;
    this.setState({
      emprestimoContratado,
      emprestimoSelecionado: true,
    });
  };

  render() {
    const { emprestimoSelecionado } = this.state;
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
          <li>
            <div className="collapsible-header">
              <i className="material-icons">monetization_on</i>Simulação PRICE
              <label style={{ paddingLeft: "72%" }}>
                <input
                  value="PRICE"
                  className="with-gap"
                  name="tipoEmprestimo"
                  type="radio"
                  onChange={this.handleChangeTipoEmprestimo}
                />
                <span>Price</span>
              </label>
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
              <label style={{ paddingLeft: "73%" }}>
                <input
                  value="SAC"
                  className="with-gap"
                  name="tipoEmprestimo"
                  type="radio"
                  onChange={this.handleChangeTipoEmprestimo}
                />
                <span>SAC</span>
              </label>
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
              disabled={!emprestimoSelecionado}
              onClick={this.handleClickContratarEmprestimo}
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
