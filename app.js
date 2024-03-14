const mediaAprovar = parseFloat(
  window.prompt("Média mínima para aprovação, entre 1 e 10")
);
const form = document.querySelector("form");
const buttonSubmit = document.querySelector("#button-submit");
const buttonReset = document.querySelector("#button-reset");
const table = document.querySelector("table");
const mediaUser = document.querySelector("#media-user");
let linha = "";
let notasArray = [];
let atividadesArray = [];

mediaUser.innerHTML = `Média mínima para aprovação: <span>${mediaAprovar}</span>`;

const preloadImages = (srcs) => {
  srcs.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

preloadImages(["../img/aprovado.svg", "../img/reprovado.svg"]);
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

  if (atividadesArray.includes(nomeAtividade)) {
    window.alert(`A atividade ${nomeAtividade} já foi inserida!`);
    document.querySelector("#nome-atividade").value = "";
    document.querySelector("#nota-atividade").value = "";
  } else {
    atividadesArray.push(nomeAtividade);
    notasArray.push(notaAtividade);
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

buttonReset.addEventListener("click", () => {
  location.reload();
});

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
    ? ((resultadoEmoji.innerHTML = "😃"),
      (document.body.style.backgroundImage = "url(../img/aprovado.svg)"))
    : ((resultadoEmoji.innerHTML = "😞"),
      (document.body.style.backgroundImage = "url(../img/reprovado.svg)"));

  return aprovadoMediaFinal;
}
