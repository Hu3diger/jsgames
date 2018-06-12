const PLAYER_TOKEN = 'X'
const COMPUTER_TOKEN = 'O'
const tabela = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];
function verifTermino() {
	//verifica a horizontal
	for (var i = 0; i < 3; i++) {
		if (tabela[i][0] !== ' ' && tabela[i][0] === tabela[i][1] && tabela[i][0] === tabela[i][2]) {
			return tabela[i][0];
		}
	}

	//verifica a vertical
	for (var j = 0; i < 3; i++) {
		if (tabela[0][j] !== ' ' && tabela[0][j] === tabela[1][j] && tabela[0][j] === tabela[2][j]) {
			return tabela[0][j];
		}
	}

	//verifica a diagonal - cima esquerda -> baixo direita
	if (tabela[0][0] !== ' ' && tabela[0][0] === tabela[1][1] && tabela[0][0] === tabela[2][2]) {
		return tabela[0][0];
	}

	//verifica a diagonal - baixo esquerda -> cima direita
	if (tabela[2][0] !== ' ' && tabela[2][0] === tabela[1][1] && tabela[2][0] === tabela[0][2]) {
		return tabela[2][0];
	}

	for (var i = 0; i < 3; i++) {
		for (var j = 0; j < 3; j++) {
			if (tabela[i][j] === ' ') {
				return false;
			}
		}
	}

	return null;
}

function minmax(nTabela, depth, jogador) {
	const gameState = verifTermino(nTabela);

	if (gameState === false) {
		const valores = [];

		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				const tabelaCopia = _.cloneDeep(nTabela);
				if (tabelaCopia[i][j] !== ' ') continue;
				tabelaCopia[i][j] = jogador;
				const valor = minmax(tabelaCopia, depth + 1, (jogador === PLAYER_TOKEN) ? COMPUTER_TOKEN : PLAYER_TOKEN);
				valores.push({
					cost: valor,
					cell: {
						i: i,
						j: j
					}
				});
			}
		}

		if(jogador === COMPUTER_TOKEN){
			const max = _.maxBy(valores, (v) => {
				return v.cost;
			});
			if(depth === 0){
					return max.cell;
			}else{
					return max.cost;
			}
		} else {
			const min = _.minBy(valores, (v) => {
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

$(document).ready(function () {
	$('.col').click(function () {
		$this = $(this);
		$this.html(PLAYER_TOKEN);
		const i = $this.data('i');
		const j = $this.data('j');
		tabela[i][j] = PLAYER_TOKEN;

		let gameState = verifTermino();
		if (gameState) {
			alert('Ganhador = ' + gameState);
		} else {
			const move = movimentarAI()
			tabela[move.i][move.j] = COMPUTER_TOKEN;
			$this = $('.col[data-i=' + move.i + '][data-j=' + move.j + ']');
			$this.text(COMPUTER_TOKEN);
		}
	});
});