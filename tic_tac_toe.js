// Tic Tac Toe - Indika Jayasinghe
var TicTacToe = function(){
	// Private variables
	var document, theDiv, board, player, gameOver, moves;
	
	var klass = function(doc, div){
		document = doc;
		theDiv = div;
		this.reset();
	};
	
	// Instance methods
	klass.prototype.reset = function(){ reset(); };
	klass.prototype.click = function(index){ cellClick(index); };
	
	/////////////// Private Functions /////////////////
	function reset(){
		gameOver = false;
		moves = 0;
		player = 1;
		board = [null, null, null,
		         null, null, null,
		         null, null, null];
		createBoard(theDiv);
	}
	
	function createBoard(div){
		var i, newdiv, parent, player_h2;
		
		div.innerHTML = '';
		
		// Create checker board
		parent = document.createElement('div');
		parent.setAttribute('id', 'board');
		
		// 3x3 Grid of DIVs
		for(i=0; i < 9; i++){
			newdiv = document.createElement('div');
			newdiv.setAttribute('id', 'board_cell_' + i);
			newdiv.setAttribute('class', 'cell');
			newdiv.onclick = cellClick.bind(this, i);
			parent.appendChild(newdiv);
		}
		div.appendChild(parent)
		
		// Reset button
		var btn = document.createElement('button');
		btn.innerHTML = 'Reset'
		btn.onclick = function(){ reset(); };
		div.appendChild(btn);
		
		// H2 for turn info
		player_h2 = document.createElement('h2');
		player_h2.setAttribute('id', 'player_turn');
		player_h2.innerHTML = playerTurnText();  
		
		div.appendChild(player_h2);
	}
	
	function cellClick(index){
		if( gameOver ){ return; }
		console.log("P" + player + " cell"+index);
		var cell = document.getElementById('board_cell_'+index);
		if(cell.innerHTML === '' ){
			moves++;
			cell.innerHTML = xo();
			board[index] = player;
			if( !checkBoard(player) ){
				player = (player===1  ? 2: 1);
				updatePlayerTurnText();
			}
		}
	}
	
	function updatePlayerTurnText(){
		var player_h2 = document.getElementById('player_turn');
		player_h2.innerHTML = playerTurnText();
	}
	
	function nobodyWins(){
		gameOver = true;
		var player_h2 = document.getElementById('player_turn');
		player_h2.innerHTML = 'Draw';
		console.log('draw');
		
		for(var i=0; i < 9; i++){
			getCell(i).setAttribute('class', 'cell draw');
		}
	}
	
	function playerWon(plyr){
		gameOver = true;
		var player_h2 = document.getElementById('player_turn');
		player_h2.innerHTML = 'Winner: ' + playerName(plyr);
	}

	function playerName(plyr){
		return 'Player ' + (plyr===1 ? 'A' : 'B');
	}
	
	function xo(){
		return (player===1 ? "X" : "O");
	}
	
	function playerTurnText(){
		return 'Next Turn: ' + playerName(player) + '  (' + xo() + ')';
	}
	
	function checkBoard(plyr){
		var hightlight = 0;
		if(board[0]===plyr && board[4]===plyr && board[8]===plyr){ hightlight = 1; }     // L-R diagonal
		else if(board[2]===plyr && board[4]===plyr && board[6]===plyr){ hightlight =2; } // R-L diagonal
		else if(checkRows(plyr) ){ hightlight = 3; } 
		else if(checkCols(plyr) ){ hightlight = 4; } 
		
		// Got 3 in a row
		if( hightlight != 0 ){
			if(hightlight===1){
				highlightCell(0); highlightCell(4); highlightCell(8);
			}
			if(hightlight===2){
				highlightCell(2); highlightCell(4); highlightCell(6);
			}
			playerWon(plyr);
			return true;
		}
		else if( moves >= 9){
			nobodyWins();
			return true;
		}
	}
	
	function checkRows(plyr){
		var inARow;;
		for(var row=0; row < 3; row++){
			inARow = true;
			for(var c=row*3; c< (row+1)*3; c++){
				if( board[c] !== plyr ){
					inARow = false;
					break;
				}
			}
			if(inARow){
				highLightRow(row);
				return true;
			}
		}
		return false;
	}

	function checkCols(plyr){
		for(var col=0; col < 3; col++){
			if(board[col]===plyr && board[col+3]===plyr && board[col+6]===plyr){
				highLightCol(col);
				return true;
			}
		}
		return false;
	}
	
	function highLightCol(col){
		highlightCell(col);
		highlightCell(col+3);
		highlightCell(col+6);
	}
	
	function highLightRow(row){
		highlightCell(row*3);
		highlightCell(row*3+1);
		highlightCell(row*3+2);
	}
	
	function highlightCell(index){
		getCell(index).setAttribute('class', 'cell highlight');
	}
	
	function getCell(index){
		return document.getElementById('board_cell_'+index);
	}
	return klass;
}();
