function calculateTip(event){
    event.preventDefault();

// pegar valores.
    let valorconta = document.getElementById('conta').value;
    let serviceQuali = document.getElementById('serviceQuali').value;
    let numOfPeople = document.getElementById('people').value;

// Valor da gorjeta por pessoa. 
    let total = (valorconta * serviceQuali) / numOfPeople;

// Total por pessoa.
    let Soma = ((parseFloat(valorconta))+(parseFloat(valorconta*serviceQuali))); 

// total geral da conta.
    let fulltotalpessoa = ((parseFloat(Soma))/(parseFloat(numOfPeople))); 

// colocar os valores no html (Valor da gorjeta por Pessoa)
    document.getElementById('tip').innerHTML  = 'R$ '+ total.toFixed(2);

// colocar os valores no html (Total por Pessoa)
    document.getElementById('pessoatip').innerHTML = 'R$ '+ fulltotalpessoa.toFixed(2);

// colocar os valores no html (Total Geral)
    document.getElementById('fulltip').innerHTML = 'R$ '+ Soma.toFixed(2);
    
}

document.getElementById('calcForm').addEventListener('submit', calculateTip);





