import M from "materialize-css";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Emprestimo from "../Emprestimo/Emprestimo";
import Simular from "../Emprestimo/Simular";
import ListaClientes from "./ListaClientes";
import moment from "moment";

const SITUACAO = {
  PENSIONISTA: "Pensionista",
  APOSENTADO: "Aposentado",
  FUNCIONÁRIO_PUBLICO: "Funcionário Público",
};

export default class Cadastro extends Component {
  constructor() {
    super();

    this.cpfInput = React.createRef();
    this.focusCpfInput = this.focusCpfInput.bind(this);

    this.state = {
      cpf: "",
      nome: "",
      sobrenome: "",
      salario: "",
      situacao: "",
      financiamentoValido: false,
      emprestimoContratado: false,
      simulacaoFinanciamento: {},
      listaClientes: [],
    };
  }

  focusCpfInput() {
    this.cpfInput.current.focus();
  }

  componentDidUpdate() {
    M.AutoInit();
  }

  handleNomeChange = (event) => {
    const nome = event.target.value;
    this.setState({ nome });
  };

  handleSobrenomeChange = (event) => {
    const sobrenome = event.target.value;
    this.setState({ sobrenome });
  };

  handleCPFChange = (event) => {
    const cpf = event.target.value;
    this.setState({ cpf });
    this.buscaCliente(cpf);
  };

  handleSalarioChange = (event) => {
    const salario = event.target.value;
    this.setState({ salario });
  };

  handleSituacaoChange = (event) => {
    const situacao = event.target.value;
    this.setState({ situacao });
  };

  handleFormSubmit = (event) => {
    console.log("handleFormSubmit");
    event.preventDefault();
    const {
      listaClientes,
      emprestimoContratado,
      simulacaoFinanciamento,
    } = this.state;
    const { nome, sobrenome, cpf, salario, situacao, financiamentoValido } = this.state;
    console.log(simulacaoFinanciamento);
    console.log(emprestimoContratado);
    if (financiamentoValido) {
      const cliente = {
        id: uuidv4(),
        nome,
        sobrenome,
        cpf,
        salario,
        situacao,
        emprestimos: [
          {
            mesAno: moment().format("MM/yyyy"),
            valorEmprestimoMes:
              emprestimoContratado === "PRICE"
                ? simulacaoFinanciamento.totalPagoPrice
                : simulacaoFinanciamento.totalPagoSac,
            tipo: emprestimoContratado,
            detalhes:
              emprestimoContratado === "PRICE"
                ? simulacaoFinanciamento.listaPrice
                : simulacaoFinanciamento.listaSac,
          },
        ],
      };
      listaClientes.push(cliente);
      console.log(listaClientes);
      this.setState({ listaClientes });
    }
    this.setState({
      id: "",
      nome: "",
      sobrenome: "",
      cpf: "",
      salario: "",
      situacao: "",
      emprestimos: [
        {
          mesAno: "",
          valorEmprestimoMes: 0,
        },
      ],
    });
    event.target.reset();
    this.focusCpfInput();
  };

  handleClickSimularEmprestimo = (financiamentoSimulado) => {
    const { financiamentoValido, listaSac } = financiamentoSimulado;
    this.setState({ financiamentoValido });
    this.setState({ simulacaoFinanciamento: financiamentoSimulado });
    if (!financiamentoValido && listaSac.length === 0) {
      M.toast({ html: "Valor solicitado não pode ser liberado!!" });
    }
    this.focusCpfInput();
  };

  handleClickContratarEmprestimo = (emprestimoContratado) => {
    console.log("handleClickContratarEmprestimo");
    console.log(emprestimoContratado);
    this.setState({ emprestimoContratado });
  };

  handleClickLimpar = (financiamentoSimulado) => {
    this.setState({ simulacaoFinanciamento: financiamentoSimulado });
    this.setState({
      id: "",
      cpf: "",
      nome: "",
      sobrenome: "",
      salario: "",
      situacao: "",
      outrosEmprestimos: [
        {
          mesAno: "",
          valorEmprestimoMes: 0,
        },
      ],
    });
    this.setState({ financiamentoValido: false });
    this.setState({ emprestimoContratado: false });
    this.focusCpfInput();
  };

  buscaCliente(cpf) {
    const { listaClientes } = this.state;
    const existeCliente = listaClientes.find((cliente) => {
      return cliente.cpf === cpf;
    });
    if (existeCliente) {
      const { nome, sobrenome, salario, situacao, cpf } = existeCliente;
      this.setState({
        cpf,
        nome,
        sobrenome,
        situacao,
        salario,
      });
    } else {
      this.setState({
        cpf,
        nome: "",
        sobrenome: "",
        situacao: "",
        salario: "",
      });
    }
  }

  render() {
    const {
      simulacaoFinanciamento,
      financiamentoValido,
      listaClientes,
      cpf,
      nome,
      sobrenome,
      salario,
      situacao,
    } = this.state;
    return (
      <div className="container">
        <form
          id="frmDadosCliente"
          className="col s12"
          onSubmit={this.handleFormSubmit}
        >
          <div className="row">
            <div className="input-field col s6">
              <input
                id="cpf"
                type="text"
                value={cpf}
                ref={this.cpfInput}
                className="validate"
                onChange={this.handleCPFChange}
                required
                autoFocus
                disabled={financiamentoValido}
              />
              <label htmlFor="cpf">CPF</label>
            </div>
            <div className="input-field col s6">
              <input
                id="nome"
                value={nome}
                type="text"
                className="validate"
                onChange={this.handleNomeChange}
                required
                disabled={financiamentoValido}
              />
              <label htmlFor="nome">Nome</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input
                id="sobrenome"
                value={sobrenome}
                type="text"
                className="validate"
                onChange={this.handleSobrenomeChange}
                required
                disabled={financiamentoValido}
              />
              <label htmlFor="sobrenome">Sobrenome</label>
            </div>
            <div className="input-field col s4">
              <input
                id="salario"
                value={salario}
                type="number"
                className="validate"
                onChange={this.handleSalarioChange}
                required
                disabled={financiamentoValido}
              />
              <label htmlFor="salario">Salário</label>
              <span
                className="helper-text"
                data-error="Valor informado inválido"
              >
                Salário líquido descrito em contracheque
              </span>
            </div>
            <div className="input-field col s4">
              {
                <select
                  value={situacao}
                  required
                  onChange={this.handleSituacaoChange}
                  disabled={financiamentoValido}
                >
                  <option>{}</option>
                  <option>{SITUACAO.APOSENTADO}</option>
                  <option>{SITUACAO.FUNCIONÁRIO_PUBLICO}</option>
                  <option>{SITUACAO.PENSIONISTA}</option>
                </select>
              }
              <span
                className="helper-text"
                data-error="wrong"
                data-success="right"
              >
                Informe a Situação
              </span>
            </div>
          </div>
          <Emprestimo
            onClickSimularEmprestimo={this.handleClickSimularEmprestimo}
            onClickLimpar={this.handleClickLimpar}
            salarioLiquido={salario}
            temFinanciamento={financiamentoValido}
          />
          {financiamentoValido && (
            <Simular
              simulacaoFinanciamento={simulacaoFinanciamento}
              onClickContratarEmprestimo={this.handleClickContratarEmprestimo}
            />
          )}
        </form>
        {listaClientes.length > 0 && !financiamentoValido && (
          <ListaClientes clientes={listaClientes} />
        )}
      </div>
    );
  }
}
