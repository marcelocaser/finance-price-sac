import React, { Component } from "react";
import { financiar } from "../../helpers/financiarController";
import M from "materialize-css";

export default class Financiar extends Component {
  constructor() {
    super();

    this.state = {
      valorFinanciado: "",
      taxaJuros: "",
      parcelas: "",
    };
  }

  componentDidMount() {
    M.AutoInit();
  }

  componentDidUpdate() {
    const { temFinanciamento } = this.props;
    const { financiamentoValido } = this.state;
    // previne erro "Maximum update depth exceeded.""
    if (temFinanciamento !== financiamentoValido) {
      this.setState({
        financiamentoValido: temFinanciamento,
      });
      if (!temFinanciamento) {
        this.setState({
          valorFinanciado: "",
          taxaJuros: "",
          parcelas: "",
        });
      }
    }
  }

  handleButtonSimularEmprestimo = () => {
    const { salarioLiquido, temEmprestimos } = this.props; // busca o salario informado e se tem outros emprestimos
    const { valorFinanciado, taxaJuros, parcelas } = this.state;
    let totalEmprestimosContratados = 0;
    if (temEmprestimos) {
      totalEmprestimosContratados = temEmprestimos.reduce((acc, cur) => {
        return acc + cur.valorEmprestimoMes;
      }, 0);
    }
    if (valorFinanciado && taxaJuros && parcelas) {
      const valorMaximoParcela = salarioLiquido * 0.3; // Valor maximo da parcela menos 30%
      const valorSolicitadoMaisContratado =
        Number(valorFinanciado) + Number(totalEmprestimosContratados);
      let simuladorA = new financiar(
        String(valorSolicitadoMaisContratado),
        taxaJuros,
        parcelas
      );
      //simuladorA.tratarMascaraReal(); /* Remove a máscara de R$ */
      simuladorA.formataDados(); /* Faz as conversões para Int e Float */
      const financiarPrice = simuladorA.financiarPrice(valorMaximoParcela);
      const totalJurosPrice = simuladorA.calculaTotalJurosPrice();
      const totalPagoPrice = simuladorA.calculaTotalPagoPrice();
      const listaPrice = simuladorA.listaPrice;
      let simuladorB = new financiar(
        String(valorSolicitadoMaisContratado),
        taxaJuros,
        parcelas
      );
      //simuladorB.tratarMascaraReal(); /* Remove a máscara de R$ */
      simuladorB.formataDados(); /* Faz as conversões para Int e Float */
      const financiarSac = simuladorB.financiarSac(
        valorMaximoParcela
      ); /* Faz a simulação Sac e constrói a lista de prestações */
      const listaSac = simuladorB.listaSac;
      const totalPagoSac = simuladorB.calculaTotalPagoSac();
      const totalJurosSac = simuladorB.calculaTotalJurosSac();
      const financiamentoValido = financiarPrice > 0 && financiarSac > 0;
      const simulacaoFinanciamento = {
        listaSac,
        listaPrice,
        totalPagoSac,
        totalJurosSac,
        financiarPrice,
        financiarSac,
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

  handleClickLimpar = () => {
    const simulacaoFinanciamento = {
      listaSac: [],
      listaPrice: [],
      totalPagoSac: 0,
      totalJurosSac: 0,
      financiarPrice: 0,
      financiarSac: 0,
      totalJurosPrice: 0,
      totalPagoPrice: 0,
      financiamentoValido: false,
    };
    this.setState({
      valorFinanciado: "",
      taxaJuros: "",
      parcelas: "",
    });
    this.props.onClickSimularEmprestimo(simulacaoFinanciamento);
    this.props.onClickLimpar(simulacaoFinanciamento);
  };

  render() {
    const { temFinanciamento } = this.props;
    const { valorFinanciado, taxaJuros, parcelas } = this.state;
    return (
      <>
        <div className="row">
          <div className="input-field col s4">
            <input
              id="valor"
              value={valorFinanciado}
              type="text"
              className="validate"
              onChange={this.handleValorFinanciadoChange}
              required
              disabled={temFinanciamento}
            />
            <label htmlFor="valor">Valor Financiado:</label>
          </div>
          <div className="input-field col s4">
            <input
              id="taxa"
              value={taxaJuros}
              type="number"
              className="validate"
              onChange={this.handleTaxaJurosChange}
              required
              disabled={temFinanciamento}
            />
            <label htmlFor="taxa">Taxa de Juros(%) ao mês:</label>
          </div>
          <div className="input-field col s4">
            <input
              id="parcelas"
              value={parcelas}
              type="number"
              className="validate"
              onChange={this.handleNumeroParcelaChange}
              min="1"
              step="1"
              required
              disabled={temFinanciamento}
            />
            <label htmlFor="parcelas">N&ordm; Parcelas ( em meses ):</label>
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <button
              className="btn waves-effect waves-light"
              onClick={this.handleButtonSimularEmprestimo}
              disabled={temFinanciamento}
            >
              Simular Empréstimo
              <i className="material-icons right">attach_money</i>
            </button>
          </div>
          <div className="col s6 right-align">
            <button
              className="btn waves-effect waves-light red"
              type="reset"
              onClick={this.handleClickLimpar}
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
