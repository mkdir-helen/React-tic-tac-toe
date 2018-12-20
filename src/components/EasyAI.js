import React, { Component } from 'react';
import '../App.css';
import Status from './Status';
import goofy from '../images/melon_guy.jpg';

class EasyAI extends Component {
  constructor(props){
    super(props);
    this.state = {
      board: Array(9).fill(null),
      player: null,
      winner: null,
      winArray: [],
      tie: false,
      turn: true,
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
    console.log(randomIndex);
    let newIndex = this.getEmptySpots()[0];
    if(!this.state.winner && this.state.turn === false){
      if(this.state.board[4]===null){
        newBoard[randomIndex] = this.state.player;
      }else{
        newBoard[newIndex] = this.state.player;
      }
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
      tie: false,
      turn: true,
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
        <h1>Opponent: Barney Derp</h1>
        <h3>"Nice shirt you got there."</h3>
        <Status player={this.state.player} 
        setPlayer={(e)=>(this.setPlayer(e))}
        winner={this.state.winner}
        tie={this.state.tie}
        />
        <div className="board">
          {this.renderBoxes()}
          <img className="goofy" src={goofy} alt=""/>
        </div>
        <button disabled={!this.state.winner && this.state.tie === false} 
        onClick={()=> this.reset()}
        className="reset">Reset</button>
      </div>
    );
  }
}

export default EasyAI;