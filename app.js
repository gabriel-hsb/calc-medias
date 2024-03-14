const mediaAprovar = parseFloat(window.prompt("Média mínima para aprovação"));
const form = document.querySelector("form");
const submit = document.querySelector("form button");
const table = document.querySelector("table");
let linha = "";

let notasArray = [];
let atividadesArray = [];

// quando clicar em submit, chama todas as funções criadas
form.addEventListener("submit", (e) => {
  e.preventDefault();
  adicionarLinha();
  atualizarTabela();
  calcMediaFinal(notasArray);
});

function adicionarLinha() {
  const nomeAtividade = document.querySelector("#nome-atividade").value;
  const notaAtividade = parseFloat(
    document.querySelector("#nota-atividade").value
  );
  notasArray.push(notaAtividade);

  if (atividadesArray.includes(nomeAtividade)) {
    window.alert(`A atividade ${nomeAtividade} já foi inserida!`);
    document.querySelector("#nome-atividade").value = "";
  } else {
    atividadesArray.push(nomeAtividade);
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
  document.querySelector("#nome-atividade").value = "";
  document.querySelector("#nota-atividade").value = "";
}

function atualizarTabela() {
  const corpoTabela = document.querySelector("tbody");
  corpoTabela.innerHTML = linha;
}

function calcMediaFinal(array) {
  let valores = 0; // Declarando valores dentro da função para evitar problemas de escopo global
  let notasArray = []; // Declarando e inicializando o array de notas
  const resultadovalor = document.querySelector("#resultado-valor");
  const resultadoEmoji = document.querySelector("#resultado-emoji");

  const notaAtividade = parseFloat(
    document.querySelector("#nota-atividade").value
  );
  notasArray.push(notaAtividade);

  for (let i = 0; i < array.length; i++) {
    valores += parseFloat(array[i]);
  }

  valores /= array.length; // Calculando a média das notas

  resultadovalor.innerHTML = valores.toFixed(2);

  const aprovadoMediaFinal = valores >= mediaAprovar;

  aprovadoMediaFinal
    ? (resultadoEmoji.innerHTML = "😃")
    : (resultadoEmoji.innerHTML = "😞");

  return aprovadoMediaFinal;
}
