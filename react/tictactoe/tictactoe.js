/* Tutorial From React https://reactjs.org/tutorial/tutorial.html */

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (<Square value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}/>);
  }

  render() {
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      move: 0,
      xturn: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.move + 1);
    const current = history[history.length - 1];
    if (calculateWinner(current.squares) || current.squares[i]) {
      return;
    }
    const new_squares = current.squares.slice();
    new_squares[i] = this.state.xturn ? 'X' : 'O';
    this.setState({
      history: history.concat([{squares: new_squares}]),
      move: history.length,
      xturn: !this.state.xturn
    });
  }

  jumpTo(move) {
    this.setState({
      move: move,
      xturn: (move % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.move];
    const winner = calculateWinner(current.squares);

    const moves = history.map((squares, index) => {
      const desc = index ? ('Go to move #' + index) : 'Go to game start';
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xturn ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
