import React, { Component } from "react";
import { financiar } from "../../helpers/financiarController";
import M from "materialize-css";

export default class Financiar extends Component {
  constructor() {
    super();

    this.state = {
      valorFinanciado: 0,
      taxaJuros: 0,
      parcelas: 0,
      financiarPrice: 0,
      listaSac: [],
      listaPrice: [],
      //financiamentoValido: false,
    };
  }

  componentDidMount() {
    M.AutoInit();
    //this.setState({ financiamentoValido });
  }

  componentDidUpdate() {
    const { temFinanciamento } = this.props;
    const { financiamentoValido } = this.state;

    // previne erro "Maximum update depth exceeded.""
    if (temFinanciamento !== financiamentoValido) {
      this.setState({ financiamentoValido: temFinanciamento });
    }
  }

  handleButtonSimularEmprestimo = () => {
    const { salarioLiquido } = this.props; // busca o salario informado
    const { valorFinanciado, taxaJuros, parcelas } = this.state;

    if (valorFinanciado && taxaJuros && parcelas) {
      const valorMaximoParcela = salarioLiquido * 0.3; // Valor maximo da parcela menos 30%
      let simuladorA = new financiar(valorFinanciado, taxaJuros, parcelas);
      simuladorA.tratarMascaraReal(); /* Remove a máscara de R$ */
      simuladorA.formataDados(); /* Faz as conversões para Int e Float */
      const financiarPrice = simuladorA.financiarPrice(valorMaximoParcela);
      const totalJurosPrice = simuladorA.calculaTotalJurosPrice();
      const totalPagoPrice = simuladorA.calculaTotalPagoPrice();
      const listaPrice = simuladorA.listaPrice;
      let simuladorB = new financiar(valorFinanciado, taxaJuros, parcelas);
      simuladorB.tratarMascaraReal(); /* Remove a máscara de R$ */
      simuladorB.formataDados(); /* Faz as conversões para Int e Float */
      simuladorB.financiarSac(); /* Faz a simulação Sac e constrói a lista de prestações */
      const listaSac = simuladorB.listaSac;
      const totalPagoSac = simuladorB.calculaTotalPagoSac();
      const totalJurosSac = simuladorB.calculaTotalJurosSac();
      const financiamentoValido = financiarPrice > 0;
      const simulacaoFinanciamento = {
        listaSac,
        listaPrice,
        totalPagoSac,
        totalJurosSac,
        financiarPrice,
        totalJurosPrice,
        totalPagoPrice,
        financiamentoValido,
      };
      this.props.onClickSimularEmprestimo(simulacaoFinanciamento);
    }
  };

  handleValorFinanciadoChange = (event) => {
    const valorFinanciado = event.target.value;
    this.setState({
      valorFinanciado,
    });
  };

  handleTaxaJurosChange = (event) => {
    const taxaJuros = event.target.value;
    this.setState({
      taxaJuros,
    });
  };

  handleNumeroParcelaChange = (event) => {
    const parcelas = event.target.value;
    this.setState({
      parcelas,
    });
  };

  handleButtonClear = () => {
    this.props.onClickLimpar();
  };

  render() {
    const { financiamentoValido } = this.state;
    return (
      <>
        <div className="row">
          <div className="input-field col s4">
            <input
              id="valor"
              type="text"
              className="validate"
              onInput={this.handleValorFinanciadoChange}
              required
              disabled={financiamentoValido}
            />
            <label htmlFor="valor">Valor Financiado:</label>
          </div>
          <div className="input-field col s4">
            <input
              id="taxa"
              type="text"
              className="validate"
              onInput={this.handleTaxaJurosChange}
              required
              disabled={financiamentoValido}
            />
            <label htmlFor="taxa">Taxa de Juros(%) ao mês:</label>
          </div>
          <div className="input-field col s4">
            <input
              id="parcelas"
              type="number"
              className="validate"
              onInput={this.handleNumeroParcelaChange}
              min="1"
              step="1"
              required
              disabled={financiamentoValido}
            />
            <label htmlFor="parcelas">N&ordm; Parcelas ( em meses ):</label>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <button
              className="btn waves-effect waves-light"
              onClick={this.handleButtonSimularEmprestimo}
              disabled={financiamentoValido}
            >
              Simular Empréstimo
              <i className="material-icons right">attach_money</i>
            </button>
          </div>
          <div className="col s6" style={{ textAlign: "right" }}>
            <button
              className="btn waves-effect waves-light red"
              type="reset"
              onClick={this.handleButtonClear}
            >
              Limpar
              <i className="material-icons right">delete</i>
            </button>
          </div>
        </div>
      </>
    );
  }
}
