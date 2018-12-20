import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Status from './components/Status';

let winLines = 
[
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7","8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", '8'],
  ['0', '4','8'],
  ['2', '4', '6']
]
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: Array(9).fill(null),
      player: null,
      winner: null,
      winArray: [],
      tie: false,
      turn: true,
      human: null,
      computer: null
    }
  }

  checkWinner(){
    let winner = this.checkMatch(winLines, this.state.board, this.state.player);
    this.setState({
      winner
    })
    this.checkTie();
    
  }
  checkMatch(winLines, newBoard, player){
    let winner = null;
    for(let index = 0; index<winLines.length; index++){
      const[a, b, c] = winLines[index];
      let board = newBoard;
      if(board[a] === player && board[b] === player && board[c] === player){
        let Array = [a, b, c];
        let winArray = Array.map((x) => {return parseInt(x)});
        winner = player;
        this.setState({
          winArray: [...winArray]
        })
      }
    } 
    console.log(winner);
    return winner;   
  }

  checkTie(){
    if(this.state.winner === null && !this.state.board.includes(null)){
      this.setState({
        tie: true
      })
    }
  }
  
  handleClick(index){
    if(this.state.player && !this.state.winner && this.state.turn === true ){
      let newBoard = this.state.board;
      if(this.state.board[index] === null ){
        newBoard[index] = this.state.player;
        this.setState({
          board: newBoard,
          player: this.state.player === "X" ? "O" : "X",
          turn: false
        }, ()=>{
          // this.checkWinner();
          // this.checkTie();
        })
        this.checkWinner();
        this.checkTie();
        
        setTimeout(()=>this.computerTurn(), 1000);
        
      }
    }
  }

  getEmptySpots(){
    let array = [];
    for(let i=0; i<this.state.board.length; i++){
      if(this.state.board[i] === null){
        array.push(i);
      }
    }
    return array;
  }

  randomize(array){
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
    }
    return rand;
}

  computerTurn(){
    let newBoard = this.state.board;
    let randomIndex = this.getEmptySpots()[this.randomize(this.getEmptySpots())];
    let minimaxIndex = this.minimax(this.state.board, this.state.computer).index;
    console.log(minimaxIndex);
    // console.log(randomIndex);
    let newIndex = this.getEmptySpots()[0];
    if(!this.state.winner && this.state.turn === false){
      // if(this.state.board[4]===null){
        newBoard[newIndex] = this.state.player;
      // }else{
      //   newBoard[newIndex] = this.state.player;
      // }
      this.setState({
        board: newBoard
      })
      this.checkWinner();
      this.checkTie();
    }  
    this.setState({
      player: this.state.player === "O" ? "X" : "O",
      turn: true
    })
  }
 



  //About to break this thing
  //new code crashing!!!!
  //keeps count of function calls
  // let fc = 0;

  
  // the main minimax function
  minimax(newBoard, player){
  // //add one to function calls
  // fc++;
  
  //available spots
  let availSpots = this.emptyIndexies(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (this.winning(newBoard, this.state.human)){
     return {score:-10};
  }
	else if (this.winning(newBoard, this.state.computer)){
    return {score:10};
	}
  else if (availSpots.length === 0){
  	return {score:0};
  }

// an array to collect all the objects
  let moves = [];

  // loop through available spots
  for (let i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    let move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player === this.state.computer){
      let result = this.minimax(newBoard, this.state.human);
      move.score = result.score;
    }
    else{
      let result = this.minimax(newBoard, this.state.computer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  let bestMove;
  if(player === this.state.computer){
    var bestScore = -10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    let bestScore = 10000;
    for(let i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}

// returns the available spots on the board
emptyIndexies(board){
  return  board.filter(s => s === null);
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
winning(board, player){
 if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
        ) {
        return true;
    } else {
        return false;
    }
}

  ////Enough of this code//////

  setPlayer(player){
    this.setState({
      player,
      human: player,
      computer: player === "O" ? "X" : "O"
    })
  }

  reset(){
    this.setState({
      player: null,
      winner: null,
      board: Array(9).fill(null),
      winArray: [],
      tie: false,
      turn: true,
      computer: null,
      human: null
    })
  }
  renderBoxes(){
    return this.state.board.map(
      (box, index) => 
      <div className="box" key={index} 
        onClick={() => this.handleClick(index)}>
        {box}
      </div>
      )
  }

  
  render() {
    
    return (
      <div className="container">
        <h1>Tic Tac Toe App</h1>
        <Status player={this.state.player} 
        setPlayer={(e)=>(this.setPlayer(e))}
        winner={this.state.winner}
        tie={this.state.tie}
        />
        <div className="board">
          {this.renderBoxes()}
        </div>
        <button disabled={!this.state.winner && this.state.tie === false} 
        onClick={()=> this.reset()}
        className="reset">Reset</button>
      </div>
    );
  }
}

export default App;
