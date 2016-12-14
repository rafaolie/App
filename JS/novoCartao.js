(function() {
  var $novoCartaoConteudo = document.querySelector(".novoCartao-conteudo");
  var $novoCartao = document.querySelector(".novoCartao");

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

  $(".novoCartao").submit(function(event) {
    var campoConteudo = $(".novoCartao-conteudo");
    var conteudo = campoConteudo.val()
                                .trim()
                                .replace(/\n/g, "<br>");

    if (conteudo) {
      controladorDeCartoes.adicionaCartao(conteudo)
    }

    campoConteudo.val("");
    event.preventDefault();
  });


})();
