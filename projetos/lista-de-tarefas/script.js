function addtarefa() {
    //pega o input type="text" do html
    var inserirtarefa = document.getElementById("inserirtarefa");

    //pega o ul do html
    var listadetarefa = document.getElementById("listadetarefa");

    //pegar o texto e colocar dentro do ul do html 
    if (inserirtarefa.value !== '') {
        var tarefaItem = document.createElement("li");
        tarefaItem.innerText = inserirtarefa.value;
        
        // quando clicar => deve marcar como tarefa realizada. com trocra de class.
        tarefaItem.addEventListener("click", function() {
            tarefaItem.classList.toggle("completed");
        });
        
        //opção de deletar um item da lista de tarefa
        //add botão
        var deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        
        //class do botão de deletar
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", function(e) {
            e.stopPropagation(); 
            tarefaItem.remove();
        });

        listadetarefa.appendChild(tarefaItem);
        tarefaItem.appendChild(deleteButton);
        inserirtarefa.value = '';
    }
}


document.getElementById("addButton").addEventListener("click", addtarefa);


