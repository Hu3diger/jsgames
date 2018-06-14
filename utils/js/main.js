(function(){
	/*Diagonal
	i+1 ou i-1 e j+2 ou j-2
	YO FRONTE MEIN
	todos i
	Lados
	todos j*/
	
	var posicaoSelecionada;
	var $tabela = document.getElementsByTagName("tbody")[0];
	var $rows = document.getElementsByTagName("tr");
	var $cols = document.getElementsByTagName("td");
	var $peca = document.createElement("img");
	
	$tabela.addEventListener('click', function(e){
		console.log(e.target);
		addQueenImageToTableCell(e.target);
	});
	
	function padrao(){
		
	}
	
	function base(){
		
	}
	
	function pontas(){
		
	}

	function addQueenImageToTableCell(celula) {
		var queenImage = document.createElement('img');
		queenImage.src = "utils/images/queen.png";
		queenImage.classList.add("queen");
		queenImage.style.width='50px';
		queenImage.style.height='50px';
		if (celula.hasChildNodes()) {
			console.log("Removendo filho");
			celula.removeChild(celula.lastChild);
			debugger;
		} else {
			console.log("Adicionando filho");
			celula.appendChild(queenImage);
		}
	}
}

)();