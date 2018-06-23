(function(){
	/*
	Refatorado para construtor, pois a remoção das linhas
	removia as anteriores.
	*/
	
	var posicaoSelecionada;
	var quadrados;
	var rows = 8;
	var cols = 8;
	var rainha = document.createElement("img");
	
	document.addEventListener("DOMContentLoaded", function() {
		criarTabela();
		inicializarTabela();
	});
	
	function criarTabela(){
		quadrados = new Array(rows);
		for (var coluna = 0; coluna < cols; coluna++) { //i
			quadrados[coluna] = new Array(rows);
		}
	}
	
	function inicializarTabela(){	
		var tabela = document.getElementById("jogo");
		//tabela.innerHTML = null;
		for (var y = 0; y < rows; y++) {
			var tabelaRow = document.createElement("tr");
			for (var x = 0; x < cols; x++) {
				var tabelaCell = document.createElement("td");
				// Resgistrar aoCliqueDoQuadrado() função para ativar ao clique
				tabelaCell.addEventListener("click", aoCliqueDoQuadrado);
				if ((y % 2) === (x % 2)) {
					tabelaCell.className = "branco";
				} else {
					tabelaCell.className = "preto";
				}
				tabelaRow.appendChild(tabelaCell);
				quadrados[x][y] = new Quadrados(x, y, tabelaCell);
			}
			tabela.appendChild(tabelaRow);
		}
	};
	
	function addRainhaTabelaCell(cell) {
		var queenImage = document.createElement('img');
		queenImage.src = "utils/images/queen.png";
		queenImage.classList.add("queen");
		queenImage.style.width='100%';
		queenImage.style.height='100%';
		cell.appendChild(queenImage);
	}
	
	function removerRainhaTabelaCell(cell){ //Verificar hasChild da IMG
		while(cell.hasChildNodes()){
			cell.removeChild(cell.lastChild);
		}
	}
	
	function Quadrados(cols, rows, tabelaCell){
		this.rows = rows;
		this.cols = cols;
		this.temRainha = false;
		this.tabelaCell = tabelaCell;
		this.dominado = 0; //Verificar parametro
	}
	
	function aoCliqueDoQuadrado() {
	var cols = this.cellIndex;
	var rows = this.parentNode.rowIndex;
	
	var square = quadrados[cols][rows]; //Posicao da Rainha
	if (square.temRainha) { 			//Modo remover (quadrado, bool)
		square.temRainha = false;
		//rainhasUtilizadas--;
		removerRainhaTabelaCell(square.tabelaCell);
		setQuadradosDominados(square, true);
	} else { 							//Adicionar
		square.temRainha = true;
		//rainhasUtilizadas++;
		addRainhaTabelaCell(square.tabelaCell);
		setQuadradosDominados(square);
	}
	//updateQueensUsedHTML();
	if (verificarSolucao()) {
		//updateBest();
		jaFinalizou = true;
		}
	}
	
	
	function setQuadradosDominados(posicaoRainha, remove = false) {
		
	//Mesma linha
	for (var column = 0; column < cols; column++) {
		if (remove) {
			quadrados[column][posicaoRainha.rows].dominado--;
		} else {
			quadrados[column][posicaoRainha.rows].dominado++;
		}
	}
	//Mesma coluna
	for (var row = 0; row < rows; row++) {
		if (remove) {
			quadrados[posicaoRainha.cols][row].dominado--;
		} else {
			quadrados[posicaoRainha.cols][row].dominado++;
		}
	}
	// Diagonal tras direita
	var row = posicaoRainha.rows;
	var column = posicaoRainha.cols;
	while (row < rows && column < cols) {
		if (remove) {
			quadrados[column][row].dominado--;
		} else {
			quadrados[column][row].dominado++;
		}
		row++;
		column++;
	}
	// Diagonais frente esquerda
	row = posicaoRainha.rows;
	column = posicaoRainha.cols;
	while (row >= 0 && column >= 0) {
		if (remove) {
			quadrados[column][row].dominado--;
		} else {
			quadrados[column][row].dominado++;
		}
		row--;
		column--;
	}
	// Diagonal tras esquerda
	row = posicaoRainha.rows;
	column = posicaoRainha.cols;
	while (row >= 0 && column < cols) {
		if (remove) {
			quadrados[column][row].dominado--;
		} else {
			quadrados[column][row].dominado++;
		}
		row--;
		column++;
	}
	// Diagonais frente direita
	row = posicaoRainha.rows;
	column = posicaoRainha.cols;
	while (row < rows && column >= 0) {
		if (remove) {
			quadrados[column][row].dominado--;
		} else {
			quadrados[column][row].dominado++;
		}
		row++;
		column--;
	}
	// Rainha sobre ela mesma
	if (remove) {
		posicaoRainha.dominado += 5
	} else {
		posicaoRainha.dominado -= 5;
	}
	atualizarQuadradosDominados();
}

function atualizarQuadradosDominados() {
	for (var row = 0; row < quadrados.length; row++) {
		for (var column = 0; column < quadrados[row].length; column++) {
			if (quadrados[row][column].dominado > 0) {
				quadrados[row][column].tabelaCell.classList.add("dominado");
			} else {
				quadrados[row][column].tabelaCell.classList.remove("dominado");
			}
		}
	}
}


	function verificarSolucao(){
		for(var col = 0;col<cols;col++){
			for(var row=0;row<rows;row++){
				var quadrado = quadrados[col][row];
				if (!(quadrado.dominado > 0)) {
					return false;
				}
			}
		}
		return true; //
	}
	
}

)();