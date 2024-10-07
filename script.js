class Calculadora {
  constructor() {
    this.visor = document.getElementById("visor");
    this.status = "desligado";
    this.ultimoValor = "";
    this.operacao = [];
    this.historico = [];
    this.listaHistorico = document.getElementById("historicoList");
  }

  ligarCalculadora() {
    this.visor.innerText = "0";
    this.operacao = [];
    this.status = "ligado"; 
  }

  ehOperador(valor) {
    return ["+", "-", "*", "/"].includes(valor);
  }

  lerNumeros(valorDigitado) {
    if (this.status === "desligado") {
      console.error("Calculadora desligada");
      return;
    }
    if (this.ehOperador(valorDigitado) && this.ehOperador(this.operacao[this.operacao.length - 1])) {
      this.operacao[this.operacao.length - 1] = valorDigitado;
    } else {
      this.operacao.push(valorDigitado);
    }
    this.visor.innerText = this.operacao.join("");
  }

  calcularExpressao() {
    if (this.status === "desligado") {
      console.error("Calculadora desligada");
      return; 
    }
    const expressao = this.operacao.join("");
    try {
      const resultado = eval(expressao); 
      this.visor.innerText = resultado;
      this.adicionarHistorico(`${new Date().toLocaleTimeString()} - ${expressao} = ${resultado}`);
      this.operacao = [resultado];
    } catch {
      this.visor.innerText = "Erro";
    }
  }

  apagaUltimoDigito() {
    if (this.status === "desligado") {
      console.error("Calculadora desligada");
      return; 
    }
    this.operacao.pop(); 
    this.visor.innerText = this.operacao.join("") || "0"; 
  }
  
  limparCalculadora() {
    if (this.status === "desligado") {
      console.error("Calculadora desligada");
      return; 
    }
    this.operacao = [];
    this.visor.innerText = "0";
  }

  adicionarHistorico(entrada) {
    this.historico.unshift(entrada);
    if (this.historico.length > 4) {
      this.historico.pop();
    }
    this.listaHistorico.innerHTML = this.historico
      .map(item => `<li><button class="historico-item">${item}</button></li>`)
      .join("");

    document.querySelectorAll(".historico-item").forEach(button => {
      button.addEventListener("click", () => {
        const expressao = button.innerText.split(' - ')[1].split(' = ')[0];
        this.operacao = [expressao];
        this.visor.innerText = expressao;
      });
    });
  }

  desligarCalculadora() {
    this.status = "desligado";
    this.operacao = [];
    this.visor.innerText = "";
  }

}

const calculadora = new Calculadora();

document.querySelectorAll(".numeros").forEach(button => {
  button.addEventListener("click", () => {
    calculadora.lerNumeros(button.value);
  });
});

document.querySelectorAll(".operadores").forEach(button => {
  button.addEventListener("click", () => {
    calculadora.lerNumeros(button.value);
  });
});

document.querySelector(".button-limpar").addEventListener("click", () => {
  calculadora.limparCalculadora();
});

document.querySelector(".button-desligar").addEventListener("click", () => {
  calculadora.desligarCalculadora();
});

document.querySelector(".button-result").addEventListener("click", () => {
  calculadora.calcularExpressao();
});
