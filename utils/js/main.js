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
		let elemet = document.getElementsByTagName("img")[0];
		if(void 0 !== elemet) {
			if(e.target !== elemet && !elemet.contains(e.target)) addQueenAndInsertToTableCell(e.target);
			else console.log("Sou uma img");
		}else if(e.target) {
			addQueenAndInsertToTableCell(e.target);
		}
			
		
	});
	
	function padrao(){
		
	}
	
	function base(){
		
	}
	
	function pontas(){
		
	}

	function addQueenAndInsertToTableCell(celula) {
		var queenImage = document.createElement('img');
		queenImage.src = "utils/images/queen.png";
		queenImage.classList.add("queen");
		queenImage.style.width='100%'; //td é relativo a viewport e a imagem é relativa a td - BUG - Queen stack bug
		queenImage.style.height='100%';
		celula.appendChild(queenImage);
	}
}

)();