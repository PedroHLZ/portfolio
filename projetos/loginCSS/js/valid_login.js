var pwInput = document.getElementById("pass");
var letter = document.getElementById("minuscula");
var capital = document.getElementById("maiuscula");
var number = document.getElementById("numero");
var length = document.getElementById("minimo");

// pega o validador de senha e deixa ele em modo invisivel, até a o Usuario for digitar a senha //
pwInput.onfocus = function() {
  document.getElementById("mensagem").style.display = "block";
}
// verificar letras minuscula, e trocar o estilo de vermelho para verde e vice versa //
pwInput.onkeyup = function() {
  var lowerCaseLetters = /[a-z]/g;
  if(pwInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  // verificar letras maiuscula, e trocar o estilo de vermelho para verde e vice versa //
  var upperCaseLetters = /[A-Z]/g;
  if(pwInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }
// verificar letras numero, e trocar o estilo de vermelho para verde e vice versa //
  var numbers = /[0-9]/g;
  if(pwInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
// fazer a contagem de caracteris de no minimo 8 para validação //
  if(pwInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

