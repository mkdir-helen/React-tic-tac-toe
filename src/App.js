import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Status from './components/Status';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: Array(9).fill(null),
      player: null,
      winner: null,
      winArray: [],
      tie: false
    }
  }

  checkWinner(){
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
    this.checkMatch(winLines);
    this.checkTie();
    
  }
  checkMatch(winLines){
    for(let index = 0; index<winLines.length; index++){
      const[a, b, c] = winLines[index];
      let board = this.state.board;
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        let Array = [a, b, c];
        let winArray = Array.map((x) => {return parseInt(x)});
        console.log(winArray);
        // alert('You won');
        this.setState({
          winner: this.state.player,
          winArray: [...winArray]
        })
      }
    }    
  }

  checkTie(){
    if(this.state.winner === null && !this.state.board.includes(null)){
      this.setState({
        tie: true
      })
    }
  }

  handleClick(index){
    if(this.state.player && !this.state.winner){
      let newBoard = this.state.board;
      if(this.state.board[index] === null ){
        newBoard[index] = this.state.player;
        this.setState({
          board: newBoard,
          player: this.state.player === "X" ? "O" : "X"
        })
        this.checkWinner();
        this.checkTie();
      }
    }
  }

  setPlayer(player){
    this.setState({
      player
    })
  }

  reset(){
    this.setState({
      player: null,
      winner: null,
      board: Array(9).fill(null),
      winArray: [],
      tie: false
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
