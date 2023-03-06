function typeWriter(elemento){
    const escreverTexto = elemento.innerHTML.split('');
    elemento.innerHTML = ' ';
    escreverTexto.forEach(function(letra, i){   
      
    setTimeout(function(){
        elemento.innerHTML += letra;
    }, 150* i)

  });
}
const nome = document.querySelector('.escrever-nome');
typeWriter(nome);


