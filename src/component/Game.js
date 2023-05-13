import React, { useEffect, useState } from "react";
import Board from "./Board";
import { useDispatch, useSelector } from "react-redux";

import carologo from "../assets/carologo.png";
import X from "../assets/x.png";
import O from "../assets/o.png";
import usagyuun from "../assets/usagyuun.gif";
import start from "../assets/start.gif";

function Game() {
  const { board, winner } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const handleResetGame = () => {
    dispatch({
      type: "reset",
    });
  };
  const handleUndo = () => {
    if (!winner) {
      dispatch({
        type: "undo",
      });
    }
  };
  const handleRedo = () => {
    if (!winner) {
      dispatch({
        type: "redo",
      });
    }
  };

  return (
    <div className="game">
      <div className="game-body">
        <div className="body-bottom">
          <div className="info info-left">
            <div className="info-top">
              <img src={carologo} alt="" />
            </div>
            <div className="info-avatar">
              <img src={start} alt="" />
            </div>
            <div className="info-bottom">
              <div className="type">
                {/* <img src={X} alt="" /> */}
              </div>
            </div>
            <div className="buttons">
              <button className="btn-grad-2" onClick={handleResetGame}>
                Reset game
              </button>
              <button className="btn-grad-2" onClick={handleUndo}>
                Undo
              </button>
              <button className="btn-grad-2" onClick={handleRedo}>
                Redo
              </button>
            </div>
          </div>
          <Board board={board} />
          <div className="info info-right">
            <div className="info-top">
              <strong><h1>FUN BUG BOT</h1></strong>
            </div>
            <div className="info-avatar">
              <img src={usagyuun} alt="" />
            </div>
            <div className="info-bottom">
              <div className="type">
                {/* <img src={O} alt="" /> */}
              </div>
            </div>
            <div className="buttons">
              {/* <button>Reset game</button>
                  <button>Undo</button>
                  <button>Redo</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
