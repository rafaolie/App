"use strict"

var ninja = (function (){
  var module = {};

  module.ajax = function (json){
    var xhr = new XMLHttpRequest();

  var options = {
    url : json.url,
    method : json.method,
    success : json.success,
    error : json.error
  }

  xhr.open(options.method, options.url)

  xhr.addEventListener("progress",function (){
    console.log("Indo");
  })

  xhr.addEventListener("load", function(){
    if(xhr.status.toString().match(/2[0-9]{2}/)){
      options.success;
    }
  })

  xhr.addEventListener("error", function(){
    options.error();
  })

  xhr.send()

  }

  return{
    ajax : module.ajax
  }

})
