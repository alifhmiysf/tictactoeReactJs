import { useState } from 'react';

// Fungsi untuk menghitung pemenang
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Komponen Square: Kotak individual yang bisa diklik
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Komponen Board: Menampilkan papan permainan dan menangani klik
function Board({ xIsNext, square, onPlay }) {
  function handleClick(i) {
    // Cek jika sudah ada pemenang atau kotak sudah terisi
    if (square[i] || calculateWinner(square)) return;

    // Buat salinan array squares dan isi dengan 'X' atau 'O'
    const nextSquares = square.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    
    // Panggil fungsi onPlay untuk memperbarui keadaan papan
    onPlay(nextSquares);
  }

  // Cek pemenang dan update status permainan
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next Player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <Square value={square[0]} onSquareClick={() => handleClick(0)} />
        <Square value={square[1]} onSquareClick={() => handleClick(1)} />
        <Square value={square[2]} onSquareClick={() => handleClick(2)} />
        <Square value={square[3]} onSquareClick={() => handleClick(3)} />
        <Square value={square[4]} onSquareClick={() => handleClick(4)} />
        <Square value={square[5]} onSquareClick={() => handleClick(5)} />
        <Square value={square[6]} onSquareClick={() => handleClick(6)} />
        <Square value={square[7]} onSquareClick={() => handleClick(7)} />
        <Square value={square[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Komponen utama Game: Menyimpan riwayat permainan dan mengelola alur permainan
export default function Game() {
  // State untuk riwayat permainan dan langkah saat ini
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // Tentukan apakah giliran 'X' atau 'O'
  const xIsNext = currentMove % 2 === 0;

  // Ambil papan saat ini dari riwayat
  const currentSquare = history[currentMove];

  // Fungsi untuk mengelola klik dan memperbarui riwayat
  function handlePlay(nextSquares) {
    // Buat riwayat baru dengan langkah saat ini dan langkah selanjutnya
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Fungsi untuk melompat ke langkah tertentu dalam riwayat
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Peta langkah-langkah permainan untuk riwayat
  const moves = history.map((_, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} square={currentSquare} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
