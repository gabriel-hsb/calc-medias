const form = document.querySelector("form");
const submit = document.querySelector("form button");
const table = document.querySelector("table");

const mediaAprovar = window.prompt("Média mínima para aprovação");
let linha = "";

// quando clicar em submit, chama todas as funções criadas
form.addEventListener("submit", function (e) {
  e.preventDefault();
  adicionarLinha();
  atualizaTabela();
});

function adicionarLinha() {
  const nomeAtividade = document.querySelector("#nome-atividade").value;
  const notaAtividade = document.querySelector("#nota-atividade").value;
  const aprovado = notaAtividade >= mediaAprovar;
  let statusAtividade = "";
  if (aprovado) {
    statusAtividade = "Aprovado!";
  } else {
    statusAtividade = "Reprovado!";
  }

  linha += "<tr>";

  linha += `<td> ${nomeAtividade} </td>`;
  linha += `<td> ${notaAtividade} </td>`;
  linha += `<td> ${statusAtividade} </td>`;

  linha += "</tr>";
}

// Insere a linha da função adicionarLinha
// dentro do body da tabela utiilizando
// o .innerHTML
function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linha;
}
