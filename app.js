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

if (isNaN(mediaAprovar) || mediaAprovar >= 10) {
  location.reload();
}

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
  mediaFinal(notasArray);
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

function mediaFinal(array) {
  const resultadovalor = document.querySelector("#resultado-valor");
  const resultadoEmoji = document.querySelector("#resultado-emoji");

  let mediaDasNotas =
    array.reduce((totalAtual, nota) => {
      return nota + totalAtual;
    }, 0) / array.length;

  const aprovadoMediaFinal = mediaDasNotas >= mediaAprovar;

  aprovadoMediaFinal
    ? ((resultadoEmoji.innerHTML = "😃"),
      (document.body.style.backgroundImage = "url(../img/aprovado.svg)"))
    : ((resultadoEmoji.innerHTML = "😞"),
      (document.body.style.backgroundImage = "url(../img/reprovado.svg)"));

  resultadovalor.innerHTML = mediaDasNotas.toFixed(2); // atualiza a tabela com resultado média

  return aprovadoMediaFinal;
}
