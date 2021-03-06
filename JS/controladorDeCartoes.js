var controladorDeCartoes = (function() {
  "use strict";
  var $novoCartaoConteudo = document.querySelector(".novoCartao-conteudo");
  var $novoCartao = document.querySelector(".novoCartao");
  var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

  function removeCartao() {
    var cartao = document.querySelector("#cartao_" + this.getAttribute("data-ref"));

    cartao.classList.add("cartao--some");

    setTimeout(function() {
      cartao.remove();
      $(document).trigger("precisaSincronizar");
    },400);
  }

  var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

  for (var i = 0; i < botoes.length; i++) {
    botoes[i].addEventListener("click", removeCartao);
  };

  $novoCartaoConteudo.addEventListener("input", function (event) {
    let $error = document.querySelector('.error');
    if ($error) {
      $error.remove();
    }
  });

  var contador = $(".cartao").length;



  function decideTipoDeCartao(conteudo) {
    var quebras = conteudo.split("<br>").length;
    var totalDeLetras = conteudo.replace(/<br>/g, " ").length;

    var ultimoMaior = "";
    conteudo.replace(/<br>/g, " ")
            .split(" ")
            .forEach(function (palavra) {
              if (palavra.length > ultimoMaior.length){
                ultimoMaior = palavra;
              }
            });

    var tamMaior = ultimoMaior.length;
    var tipoCartao = "cartao--textoPequeno";

    if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
      tipoCartao = "cartao--textoGrande"
    } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
      tipoCartao = "cartao--textoMedio";
    }

    return tipoCartao;
  }


  function adicionaCartao(conteudo, cor) {
    contador++;


    var opcoes = criaOpcoesDoCartao(contador);

    var tipoCartao = decideTipoDeCartao(conteudo);

    var conteudoTag = $("<p>").addClass("cartao-conteudo")
                              .append(conteudo);

    $("<div>").attr("id", "cartao_" + contador)
              .attr("tabindex", 0)
              .addClass("cartao")
              .addClass(tipoCartao)
              .append(opcoes)
              .append(conteudoTag)
              .css("background-color", cor)
              .prependTo(".mural");
  }

  return {
    adicionaCartao: adicionaCartao
    ,idUltimoCartao: function() {
      return contador;
    }
  }
})();
