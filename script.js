class Funcionario {
  constructor(nome, idade, cargo) {
    this.nome = nome
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
    this.idade = idade;
    this.cargo = cargo;
  }

  seApresentar() {
    return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`;
  }

  trabalhar() {
    return `${this.nome} está trabalhando como ${this.cargo}.`;
  }
}

class Gerente extends Funcionario {
  constructor(nome, idade, cargo, departamento) {
    super(nome, idade, cargo);
    this.departamento = departamento;
  }

  gerenciar() {
    return `${this.nome} está gerenciando o departamento de ${this.departamento}.`;
  }
}

class Desenvolvedor extends Funcionario {
  constructor(nome, idade, cargo, linguagem) {
    super(nome, idade, cargo);
    this.linguagem = linguagem;
  }

  programar() {
    return `${this.nome} está programando em ${this.linguagem}.`;
  }
}

function atualizarCampos() {
  const tipo = document.querySelector('input[name="tipoFuncionario"]:checked');
  const campoDepartamento = document.getElementById("campoDepartamento");
  const campoLinguagem = document.getElementById("campoLinguagem");

  if (tipo) {
    if (tipo.value === "gerente") {
      campoDepartamento.classList.remove("hidden");
      campoLinguagem.classList.add("hidden");
    } else if (tipo.value === "desenvolvedor") {
      campoDepartamento.classList.add("hidden");
      campoLinguagem.classList.remove("hidden");
    }
  }
}

document.querySelectorAll('input[name="tipoFuncionario"]').forEach((input) => {
  input.addEventListener("change", atualizarCampos);
});

function criarFuncionario() {
  document.querySelectorAll(".error").forEach((div) => (div.textContent = ""));

  try {
    const tipo = document.querySelector(
      'input[name="tipoFuncionario"]:checked'
    );
    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value, 10);
    const departamento = document.getElementById("departamento").value;
    const linguagem = document.getElementById("linguagem").value;

    let erro = false;

    if (!nome) {
      document.getElementById("errorNome").textContent = "Nome é obrigatório.";
      erro = true;
    }

    if (isNaN(idade) || idade <= 0) {
      document.getElementById("errorIdade").textContent =
        "Idade deve ser um número positivo.";
      erro = true;
    }

    if (tipo) {
      if (tipo.value === "gerente" && !departamento) {
        document.getElementById("errorDepartamento").textContent =
          "Departamento é obrigatório para Gerente.";
        erro = true;
      } else if (tipo.value === "desenvolvedor" && !linguagem) {
        document.getElementById("errorLinguagem").textContent =
          "Linguagem de Programação é obrigatória para Desenvolvedor.";
        erro = true;
      }
    } else {
      document.getElementById("errorNome").textContent =
        "Selecione o tipo de funcionário.";
      erro = true;
    }

    if (erro) {
      return;
    }

    let funcionario;
    if (tipo.value === "gerente") {
      funcionario = new Gerente(nome, idade, "Gerente", departamento);
    } else if (tipo.value === "desenvolvedor") {
      funcionario = new Desenvolvedor(nome, idade, "Desenvolvedor", linguagem);
    }

    document.getElementById("form").classList.add("hidden");
    document.getElementById("titleH3").classList.add("hidden");
    document.getElementById("resultado").classList.remove("hidden");

    document.getElementById("resultadoConteudo").innerHTML = `
      <h2>Informações do ${
        tipo.value.charAt(0).toUpperCase() + tipo.value.slice(1)
      }</h2></br>
      <p>${funcionario.seApresentar()}</p>
      <p>${funcionario.trabalhar()}</p>
      <p>${
        tipo.value === "gerente"
          ? funcionario.gerenciar()
          : funcionario.programar()
      }</p></br>
    `;
  } catch (error) {
    document.getElementById(
      "resultadoConteudo"
    ).innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
  }
}

function voltarFormulario() {
  document.getElementById("resultado").classList.add("hidden");
  document.getElementById("form").classList.remove("hidden");
  document.getElementById("titleH3").classList.remove("hidden");
}

document
  .getElementById("submitBtn")
  .addEventListener("click", criarFuncionario);

document
  .getElementById("voltarBtn")
  .addEventListener("click", voltarFormulario);
