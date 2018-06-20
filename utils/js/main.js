(function(){
	/*Diagonal
	i+1 ou i-1 e j+2 ou j-2
	YO FRONTE MEIN
	todos i
	Lados
	todos j*/
	
	var posicaoSelecionada;
	var cell;
	var $tabela = document.getElementsByTagName("tbody")[0];
	var $rows = document.getElementsByTagName("tr");
	var $cols = document.getElementsByTagName("td");
	var $peca = document.createElement("img");
	
	$tabela.addEventListener('click', function(e){	
		if(void 0 !== e.target.parentNode){
			if (void 0 === e.target.childNodes[0]){
				if(!(e.target.nodeName=="IMG")){
					console.log("Adicionando primeira rainha");
					addQueenAndInsertToTableCell(e.target);
					//e.target -> td
					console.log(e.target);
					estilizarColunas(e.target);
				} else {
					console.log("Removendo: "+e.target.nodeName);
					e.target.remove(); //Para IE -> e.target.parentNode.removeChild(e.target.parentNode.lastChild);
				}
			} else if(!(e.target.parentElement.nodeName!=="TR" || e.target.childNodes[0].nodeName=="IMG")){ //clique dentro da td
				console.log("Erro no campo selecionado");
			}
		}
	});
	
	function estilizarColunas(colunaSelecionada){
		colunas = colunaSelecionada.parentElement.children;
		
		for(var i=0;i<colunas.length;i++){
			colunas[i].style.background = 'yellow';
			if(colunaSelecionada === colunas[i]){
				estilizarLinhas(i);
			}
		}
	}
	
	function estilizarLinhas(index){
		//console.log(document.getElementsByTagName("td"));
		for(var i=0;i<64-index;i=i+8){
			//console.log(document.getElementsByTagName("td")[index+i]);
			document.getElementsByTagName("td")[index+i].style.background = 'yellow';
		}
		estilizarDiagonal(index);
	}
	/*
	function estilizarDiagonal(index){
		console.log(document.getElementsByTagName("td"));
		for(var i=0;i<64-index;i=i+9){
			document.getElementsByTagName("td")[index+i].style.background = 'yellow';
		}
		
	}
*/
	function addQueenAndInsertToTableCell(cell) {
		var queenImage = document.createElement('img');
		queenImage.src = "utils/images/queen.png";
		queenImage.classList.add("queen");
		queenImage.style.width='80%';
		queenImage.style.height='85%';
		cell.appendChild(queenImage);
	}
	
}

)();