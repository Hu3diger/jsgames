const PLAYER_TOKEN = 'X'
const COMPUTER_TOKEN = 'O'
const tabela = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' '],
];
function load() {
	$(".load").css({ display: 'none' });
	$(".joga").css({ display: 'block' });
}
function loadTxt(){
	$("#loading").html("The game is still loading...");
}
$(document).ready(function () {
	setTimeout(load, 5000);
	setTimeout(loadTxt, 1500);

	function verifTermino(novaTabela) {
		//verifica a horizontal
		for (var i = 0; i < 3; i++) {
			if (novaTabela[i][0] !== ' ' && novaTabela[i][0] === novaTabela[i][1] && novaTabela[i][0] === novaTabela[i][2]) {
				return novaTabela[i][0];
			} else if (novaTabela[0][i] !== ' ' && novaTabela[0][i] === novaTabela[1][i] && novaTabela[0][i] === novaTabela[2][i]) {
				return novaTabela[0][i];
			}
		}
		//verifica a diagonal - cima esquerda -> baixo direita
		if (novaTabela[0][0] !== ' ' && novaTabela[0][0] === novaTabela[1][1] && novaTabela[0][0] === novaTabela[2][2]) {
			return novaTabela[0][0];
		}
		//verifica a diagonal - baixo esquerda -> cima direita
		if (novaTabela[2][0] !== ' ' && novaTabela[2][0] === novaTabela[1][1] && novaTabela[2][0] === novaTabela[0][2]) {
			return novaTabela[2][0];
		}

		if (novaTabela[0].includes(' ') || novaTabela[1].includes(' ') || novaTabela[2].includes(' ')) return false;

		return null;
	}

	function minmax(nTabela, depth, jogador) {
		let gameState = verifTermino(nTabela);

		if (gameState === false) {
			let valores = [];

			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {
					let tabelaCopia = _.cloneDeep(nTabela);
					if (nTabela[i][j] !== " ") continue;
					tabelaCopia[i][j] = jogador;
					let valor = minmax(tabelaCopia, depth + 1, (jogador === PLAYER_TOKEN) ? COMPUTER_TOKEN : PLAYER_TOKEN)
					valores.push({
						cost: valor,
						cell: {
							i: i,
							j: j
						}
					});
				}
			}
			if (jogador === COMPUTER_TOKEN) {
				let max = _.maxBy(valores, (v) => {
					return v.cost;
				});
				if (depth === 0) {
					return max.cell;
				} else {
					return max.cost;
				}
			} else {
				let min = _.minBy(valores, (v) => {
					return v.cost;
				});
				if (depth === 0) {
					return min.cell;
				} else {
					return min.cost;
				}
			}

		} else if (gameState === null) {
			return 0;
		} else if (gameState === PLAYER_TOKEN) {
			return depth - 10;
		} else if (gameState === COMPUTER_TOKEN) {
			return 10 - depth;
		}
	}

	function movimentarAI() {
		return minmax(tabela, 0, COMPUTER_TOKEN);

	}

	function reiniciar() {
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				tabela[i][j] = ' ';
				$('.colz[data-i=' + i + '][data-j=' + j + ']').html(' ');
			}
		}
	}
	$('#reset').click(function () {
		reiniciar();
	});

	$('.colz').unbind().click(function () {
		$this = $(this);
		let i = $this.data('i');
		let j = $this.data('j');
		if (tabela[i][j].includes('X') || tabela[i][j].includes('O')) {
			debugger;
			alert('Jogada impossível');
		} else {
			$this.html(PLAYER_TOKEN);
			tabela[i][j] = PLAYER_TOKEN;
			let gameState = verifTermino(tabela);
			if (gameState) {
				alert('Ganhador = ' + gameState);
			} else if (gameState === null) {
				alert('Que pena... Deu velha');
			} else {
				let move = movimentarAI()
				tabela[move.i][move.j] = COMPUTER_TOKEN;
				$this = $('.col[data-i=' + move.i + '][data-j=' + move.j + ']');
				$this.text(COMPUTER_TOKEN);
				if (verifTermino(tabela)) {
					alert('Ganhador = CPU');
				}
			}
		}
	});
});