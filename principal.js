var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
var $novoCartaoConteudo = document.querySelector(".novoCartao-conteudo");
var $novoCartao = document.querySelector(".novoCartao");


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

$novoCartaoConteudo.addEventListener("input", function (event) {
  let $error = document.querySelector('.error');
  if ($error) {
    $error.remove();
  }
});

$novoCartao.addEventListener("submit", function (event) {
  let $novoCartaoConteudo = this.querySelector(".novoCartao-conteudo");

  if ($novoCartaoConteudo.value == '' && !this.querySelector('.error')) {
    let $msgError = document.createElement('span');
    $msgError.classList.add('error');
    $msgError.textContent = "Preencha o campo acima!";

    this.insertBefore($msgError, document.querySelector(".novoCartao-salvar"));
  };

  event.preventDefault();
});

var contador = $(".cartao").length;
$(".novoCartao").submit(function(event) {
  var campoConteudo = $(".novoCartao-conteudo");
  var conteudo = campoConteudo.val()
                              .trim()
                              .replace(/\n/g, "<br>");

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

    var tipoCartao = decideTipoDeCartao(conteudo)

    $("<div>").attr("id", "cartao_" + contador)
              .addClass("cartao")
              .addClass(tipoCartao)
              .append(opcoes)
              .append(conteudoTag)
              .prependTo(".mural");
  }

  campoConteudo.val("");
  event.preventDefault();
});

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

/* BUSCA*/

$("#busca").on("input", function () {
  let busca = $(this).val().trim();

  if(busca.length) {
    $(".cartao").hide().filter(function() {
      return $(this).find(".cartao-conteudo")
                    .text()
                    .match(new RegExp(busca, "i"));
    }).show();
  }else {
    $(".cartao").show();
  }
});

/*HELP*/

$("#ajuda").click(function(){
  $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
    function (res){
      res.instrucoes.forEach(function(instrucao){
        adicionaCartao(instrucao.conteudo, instrucao.cor);
      });
    });
});

function adicionaCartao(conteudo, cor) {
  contador++;

  var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                 .addClass("opcoesDoCartao-opcao")
                                 .attr("data-ref", contador)
                                 .text("Remover")
                                 .click(removeCartao);

  var opcoes = $("<div>").addClass("opcoesDoCartao")
                         .append(botaoRemove);

  var tipoCartao = decideTipoDeCartao(conteudo);

  var conteudoTag = $("<p>").addClass("cartao-conteudo")
                            .append(conteudo);

  $("<div>").attr("id", "cartao_" + contador)
            .addClass("cartao")
            .addClass(tipoCartao)
            .append(opcoes)
            .append(conteudoTag)
            .css("background-color", cor)
            .appendTo(".mural");
}

(function() {
  /*CARREGA MURAL*/
  var usuario = "seu.email@exemplo.com.br"

  $.getJSON(
    "https://ceep.herokuapp.com/cartoes/carregar?callback=?",
    {usuario: usuario},
    function(res){
      var cartoes = res.cartoes;
      console.log(cartoes.lenght + " carregados em " + res.usuario);
      cartoes.forEach(function(cartao) {
        adicionaCartao(cartao.conteudo);
      });
    }
  );

  /*ENVIO DE DADOS AO SERVIDOR*/
  $("#sync").click(function() {
    $("#sync").removeClass("botaoSync--sincronizado");
    $("#sync").addClass("botaoSync--esperando");

    var cartoes = [];

    $(".cartao").each(function() {
      var cartao = {};
      cartao.conteudo = $(this).find(".cartao-conteudo").html();
      cartoes.push(cartao);
    })

    var mural = {
      usuario: usuario
      ,cartoes: cartoes
    }

    $.ajax({
      url: "https://ceep.herokuapp.com/cartoes/salvar"
      ,method: "POST"
      ,data: mural
      ,success: function(res){
        $("#sync").addClass("botaoSync--sincronizado")
        console.log(res.quantidade + " cartões salvos em " + res.usuario);
      }
      ,error: function() {
        $("#sync").addClass("botaoSync--deuRuim");
        console.log("Não foi possível salvar o mural");
      }
      ,complete: function() {
        $("#sync").removeClass("botaoSync--esperando")
      }
    });
  });
}) ();
