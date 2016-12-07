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
