import React from "react";
import Square from "./Square";
import win from '../assets/win.png'
import lose from '../assets/lose.png';
import { useDispatch, useSelector } from "react-redux";

const Board = ({ board }) => {
  const renderSquare = (row, col, value) => (
    <Square value={value} row={row} col={col} />
  );
  const dispatch = useDispatch();
  const { start, winner } = useSelector((state) => state.game);
  const handleStart = () => {
    dispatch({
      type: "startGame",
    });
  };
  const handleReset = () => {
    dispatch({
      type: "reset"
    })
  }
  return (
    <div className="board">
      {!start ? (
        <div className="start">
          <div className="logo">
            {/* <img src={start} alt="" /> */}
          </div>
          <div className="buttons" onClick={handleStart}>
            <button className="btn-grad-1">BẮT ĐẦU</button>
          </div>
        </div>
      ) : (
        winner === "You win" ?
        <div className="start">
          <div className="logo">
            <img src={win} alt="" />
          </div>
          <div className="buttons" onClick={handleReset}>
            <button className="btn-grad-1">BẮT ĐẦU LẠI</button>
          </div>
        </div> :
        winner === "You lose" ?
        <div className="start">
          <div className="logo">
            <img src={lose} alt="" />
          </div>
          <div className="buttons" onClick={handleReset}>
            <button className="btn-grad-1">BẮT ĐẦU LẠI</button>
          </div>
        </div>
        : ''
      )}
      {board?.map((row, rowIndex) => (
        <div className="board-row" key={"row" + rowIndex}>
          {row?.map((value, colIndex) => (
            <React.Fragment key={colIndex}>
              {renderSquare(rowIndex, colIndex, board[rowIndex][colIndex])}
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
