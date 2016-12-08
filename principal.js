document.querySelector("#mudaLayout").addEventListener("click", function(){
  var mural = document.querySelector(".mural");
  mural.classList.toggle("mural--linhas");

  if (mural.classList.contains("mural--linhas")) {
    this.textContent = "Blocos";
  }else {
    this.textContent = "Linhas";
  }
});

function removeCartao() {
  var cartao = document.querySelector("#cartao_" + this.getAttribute("data-ref"));

  cartao.classList.add("cartao--some");

  setTimeout(function() {
    cartao.remove();
  },400);
}

var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

for (var i = 0; i < botoes.length; i++) {
  botoes[i].addEventListener("click", removeCartao);
};

var contador = $(".cartao").length;
$(".novoCartao").submit(function(event) {
  var campoConteudo = $(".novoCartao-conteudo");
  var conteudo = campoConteudo.val().trim();

  if (conteudo) {
    contador++;
    var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                   .addClass("opcoesDoCartao-opcao")
                                   .attr("data-ref", contador)
                                   .text("Remover")
                                   .click(removeCartao);

    var opcoes = $("<div>").addClass("opcoesDoCartao")
                           .append(botaoRemove);

    var conteudoTag = $("<p>").addClass("cartao-conteudo")
                              .append(conteudo);

    $("<div>").attr("id", "cartao_" + contador)
                                 .addClass("cartao").append(opcoes)
                                 .append(conteudoTag)
                                 .prependTo(".mural");
  }

  campoConteudo.val("");
  event.preventDefault();
});
