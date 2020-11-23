import M from "materialize-css";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Emprestimo from "../Emprestimo/Emprestimo";
import Simular from "../Emprestimo/Simular";
import ListaClientes from "./ListaClientes";

const SITUACAO = {
  PENSIONISTA: "Pensionista",
  APOSENTADO: "Aposentado",
  FUNCIONÁRIO_PUBLICO: "Funcionário Público",
};

export default class Cadastro extends Component {
  constructor() {
    super();

    this.nomeInput = React.createRef();
    this.focusNomeInput = this.focusNomeInput.bind(this);

    this.state = {
      financiamentoValido: false,
      emprestimoContratado: false,
      listaClientes: [],
    };
  }

  focusNomeInput() {
    this.nomeInput.current.focus();
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
    event.preventDefault();
    const { listaClientes, emprestimoContratado } = this.state;
    const { nome, sobrenome, cpf, salario, situacao } = this.state;
    if (emprestimoContratado) {
      const cliente = {
        id: uuidv4(),
        nome,
        sobrenome,
        cpf,
        salario,
        situacao,
      };
      listaClientes.push(cliente);
      this.setState({ listaClientes });
      this.setState({
        id: "",
        nome: "",
        cpf: "",
        salario: "",
        situacao: "",
        outrosEmprestimos: [
          {
            mesAno: "",
            valorEmprestimoMes: 0,
          },
        ],
      });
      event.target.reset();
      this.setState({
        simulacaoFinanciamento: {
          listaSac: [],
          totalPagoSac: 0,
          totalJurosSac: 0,
          financiarPrice: 0,
          totalJurosPrice: 0,
          totalPagoPrice: 0,
        },
      });
      this.setState({ financiamentoValido: false });
      this.setState({ emprestimoContratado: false });
    }
    this.focusNomeInput();
  };

  handleClickSimularEmprestimo = (simulacaoFinanciamento) => {
    const { financiamentoValido } = simulacaoFinanciamento;
    this.setState({ financiamentoValido });
    this.setState({ simulacaoFinanciamento });
    if (!financiamentoValido) {
      M.toast({ html: "Valor solicitado não pode ser liberado!!" });
    }
    this.focusNomeInput();
  };

  handleClickContratarEmprestimo = (emprestimoContratado) => {
    this.setState({ emprestimoContratado });
  };

  handleClickLimpar = () => {
    this.focusNomeInput();
    this.setState({
      id: "",
      nome: "",
      cpf: "",
      salario: "",
      situacao: "",
      outrosEmprestimos: [
        {
          mesAno: "",
          valorEmprestimoMes: 0,
        },
      ],
    });
    this.setState({
      simulacaoFinanciamento: {
        listaSac: [],
        listaPrice: [],
        totalPagoSac: 0,
        totalJurosSac: 0,
        financiarPrice: 0,
        totalJurosPrice: 0,
        totalPagoPrice: 0,
      },
    });
    this.setState({ financiamentoValido: false });
    this.setState({ emprestimoContratado: false });
  };

  render() {
    const {
      salario,
      simulacaoFinanciamento,
      financiamentoValido,
      listaClientes,
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
                id="nome"
                type="text"
                ref={this.nomeInput}
                className="validate"
                onInput={this.handleNomeChange}
                required
                autoFocus
                disabled={financiamentoValido}
              />
              <label htmlFor="nome">Nome</label>
            </div>
            <div className="input-field col s6">
              <input
                id="sobrenome"
                type="text"
                className="validate"
                onInput={this.handleSobrenomeChange}
                required
                disabled={financiamentoValido}
              />
              <label htmlFor="sobrenome">Sobrenome</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4">
              <input
                id="cpf"
                type="text"
                className="validate"
                onInput={this.handleCPFChange}
                required
                disabled={financiamentoValido}
              />
              <label htmlFor="cpf">CPF</label>
            </div>
            <div className="input-field col s4">
              <input
                id="salario"
                type="number"
                className="validate"
                onInput={this.handleSalarioChange}
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
