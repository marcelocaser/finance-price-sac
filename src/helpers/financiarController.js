function formataMascara(label, valor) {
  let formato = {
    minimumFractionDigits: 2,
    style: "currency",
    currency: label,
  };
  return valor.toLocaleString("pt-BR", formato);
}

class financiar {
  constructor(vP, i, n) {
    this.pmt = []; /* Prestação do Financiamento*/
    this.vP = vP; /* Valor Presente(Valor do Financiamento) */
    this.i = i; /* Taxa de Juros ( ao mês)*/
    this.n = n; /* Número de Parcelas(Período)*/
    this.a = 0; /* Amortização = Valor do Financiamento dividido pelo número de parcelas */
    this.totalJuros = 0; /* Total de juros pagos no financiamento*/
    this.totalPago = 0; /* Total pago no financiamento acrescido os juros*/
    this.listaSacText =
      ""; /* Armazena uma lista de texto puro com as prestações SAC*/
    this.listaSacHTML =
      ""; /* Armazena uma lista de html com as prestações SAC*/
    this.listaSac = []; /* Armazena uma lista de array com as prestacoes SAC/*/
    this.listaPrice = []; /* Armazena uma lista de array com as prestacoes PRICE/*/
  }
  tratarMascaraReal() {
    let vp = this.vP.replace(".", "");
    vp = vp.replace(",", ".");
    this.vP = vp;

    let i = this.i.replace(".", "");
    i = i.replace(",", ".");
    this.i = i;
  }
  formataDados() {
    this.vP = parseFloat(
      this.vP
    ); /* Convertemos para float/decimal (valor monetário) */
    this.i =
      parseFloat(this.i) /
      100; /* A taxa é dada em %, logo precisamos dividir por 100(pr cento) */
    this.n = parseInt(
      this.n
    ); /*Convertemos o número de parcelas para inteiro */
  }

  calculaAmortizacao() {
    this.a = this.vP / this.n;
    return this.a;
  }

  financiarPrice(valorMaximoParcela) {
    /* Aplicamos a fórmula de financiamento com base na tabela PRICE */
    let prestacao =
      (this.vP * (Math.pow(1 + this.i, this.n) * this.i)) /
      (Math.pow(1 + this.i, this.n) - 1);
    if (prestacao > valorMaximoParcela) {
      return 0;
    }
    this.pmt.push(prestacao);
    this.calculaJurosPrice(prestacao, this.vP);
    return this.pmt[0];
  }

  financiarSac(valorMaximoParcela) {
    /* Aplicamos a fórmula de financiamento com base na tabela SAC */
    this.calculaAmortizacao();
    for (let y = 0; y < this.n; y++) {
      const juros = this.i * (this.vP - y * this.a);
      let prestacao = this.a + juros;
      if (prestacao > valorMaximoParcela) {
        this.pmt = [];
        return 0;
      }
      this.pmt.push(prestacao);
      this.listaSacText +=
        y + 1 + ". prestação: " + formataMascara("BRL", prestacao) + "\n\r";
      this.listaSacHTML +=
        y + 1 + ". prestação: " + formataMascara("BRL", prestacao) + "<br>";
      const amortizacao = prestacao - juros;
      this.listaSac.push({
        numeroPrestacao: y + 1,
        valorPrestacao: prestacao,
        juros,
        amortizacao,
      });
    }
    this.calculaSaldoDevedorSAC();
    return this.pmt[0];
  }

  calculaTotalPagoPrice() {
    this.totalPago = this.pmt[0] * this.n;
    return this.totalPago;
  }

  calculaTotalJurosPrice() {
    if (this.totalPago === 0) {
      let total = this.calculaTotalPagoPrice();
      this.totalJuros = total - this.vP;
    } else {
      this.totalJuros = this.totalPago - this.vP;
    }
    return this.totalJuros;
  }
  calculaTotalPagoSac() {
    for (let p = 0; p < this.n; p++) {
      this.totalPago += this.pmt[p];
    }
    return this.totalPago;
  }
  calculaTotalJurosSac() {
    if (this.totalPago === 0) {
      let total = this.calculaTotalPagoSac();
      this.totalJuros = total - this.vP;
    } else {
      this.totalJuros = this.totalPago - this.vP;
    }
    return this.totalJuros;
  }

  valorAmortizacaoAteParcela(numeroParcela) {
    return this.listaSac.reduce((acc, curr) => {
      if (curr.numeroPrestacao <= numeroParcela) {
        acc = acc + curr.amortizacao;
      }
      return acc;
    }, 0);
  }

  calculaSaldoDevedorSAC() {
    this.listaSac = this.listaSac.map((sac) => {
      const { numeroPrestacao, valorPrestacao, juros, amortizacao } = sac;
      return {
        numeroPrestacao,
        valorPrestacao,
        juros,
        amortizacao,
        saldoDevedor:
          this.vP - this.valorAmortizacaoAteParcela(numeroPrestacao),
      };
    });
  }

  calculaJurosPrice(prestacao, valorFinanciamento) {
    this.listaPrice.push({
      numeroPrestacao: 1,
      valorPrestacao: prestacao,
      juros: valorFinanciamento * this.i,
      amortizacao: prestacao - valorFinanciamento * this.i,
      saldoDevedor:
        valorFinanciamento - prestacao + valorFinanciamento * this.i,
    });
    for (let index = 1; index < this.n; index++) {
      const saldoDevedorAnterior = this.buscaSaldoDevedorAnterior(index);
      const { saldoDevedor } = saldoDevedorAnterior;
      this.listaPrice.push({
        numeroPrestacao: index + 1,
        valorPrestacao: prestacao,
        juros: saldoDevedor * this.i,
        amortizacao: prestacao - saldoDevedor * this.i,
        saldoDevedor:
          formataMascara("BRL", saldoDevedor) ===
          formataMascara("BRL", prestacao - saldoDevedor * this.i)
            ? 0
            : saldoDevedor - prestacao + saldoDevedor * this.i,
      });
    }
  }

  buscaSaldoDevedorAnterior(numeroPrestacao) {
    return this.listaPrice.find((saldoDevedorAnterior) => {
      return saldoDevedorAnterior.numeroPrestacao === numeroPrestacao;
    });
  }
}

const _financiar = financiar;
export { _financiar as financiar };
export { formataMascara };
