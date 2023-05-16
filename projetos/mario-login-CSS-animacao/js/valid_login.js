function fazerLogin() {
  // Obtém os valores de usuário e senha
  var username = document.getElementById("usrname").value;
  var password = document.getElementById("pass").value;

  // Lógica real de validação de login
  // Você pode substituir essa lógica pela sua própria
  // Verifica se o usuário e senha estão corretos
  if (validarUsuarioSenha(username, password)) {
      // Login bem-sucedido
      document.getElementById("box").style.display = "none";
      iniciarAnimacao();
  } else {
      // Login inválido
      alert("Usuário ou senha inválidos.");
  }

  return false; // Evita o envio do formulário
}

function validarUsuarioSenha(username, password) {
  // Aqui você pode adicionar a lógica real de validação de login
  // Verifica se o usuário e senha estão corretos
  // Retorna true se forem válidos, false caso contrário
  if (username === "usuario" && password === "senha") {
      return true;
  } else {
      return false;
  }
}


function iniciarAnimacao() {
  setTimeout(function () {
      var marioElement = document.querySelector('.mario');
      marioElement.classList.add('walk1');

      setTimeout(function () {
          marioElement.classList.remove('walk1');
          marioElement.classList.add('jump');

          setTimeout(function () {
              marioElement.classList.remove('jump');
              marioElement.classList.add('walk2');

              setTimeout(function () {
                marioElement.classList.remove('walk2');
                marioElement.classList.add('jump2');
  
                setTimeout(function () {
                    marioElement.classList.remove('jump2');
                    marioElement.classList.add('stop');
                    
                }, 300);
             }, 3570);
          }, 300);

      }, 3570);
  }, 0);

  setTimeout(function () {
      var goldElement = document.querySelector('.gold');
      goldElement.classList.add('jumpgold');
      goldElement.classList.add('stopgold');
  }, 4000);
}