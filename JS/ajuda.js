(function() {
  /*HELP*/
  "use strict";



  $("#ajuda").click(function(){
    $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
      function (res){
        res.instrucoes.forEach(function(instrucao){
          controladorDeCartoes.adicionaCartao(instrucao.conteudo, instrucao.cor);
        });
      });
  });

})(controladorDeCartoes);
