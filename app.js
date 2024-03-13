const mediaAprovar = window.prompt("Média mínima para aprovação");
const form = document.querySelector("form");
const submit = document.querySelector("form button");
const table = document.querySelector("table");

let notas = [];
let atividades = [];
let linha = "";

// quando clicar em submit, chama todas as funções criadas
form.addEventListener("submit", (e) => {
  e.preventDefault();
  adicionarLinha();
  atualizaTabela();
});


// para conseguir a média final = 
// usar foreach no notas, somar notas e
// dividir pelo i (do index (i) do foreach)
// 

function mediaFinal (){
  
}
 
function adicionarLinha() {
  const nomeAtividade = document.querySelector("#nome-atividade").value;
  const notaAtividade = document.querySelector("#nota-atividade").value;
  const aprovadoAtividade = notaAtividade >= mediaAprovar;
  let statusAtividade = "";
  if (aprovadoAtividade) {
    statusAtividade = `<td class="aprovado"> Aprovado</td>`;
  } else {
    statusAtividade = `<td class="reprovado"> Reprovado</td>`;
  }

  linha += "<tr>";

  linha += `<td> ${nomeAtividade} </td>`;
  linha += `<td> ${notaAtividade} </td>`;
  linha += statusAtividade;

  linha += "</tr>";
}



// Insere a linha da função adicionarLinha
// dentro do body da tabela utiilizando
// o .innerHTML
function atualizaTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linha;
}
