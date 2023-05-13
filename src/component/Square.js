import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClickPlay } from "../redux/action";
// import gameOver from "../redux/action";
import X from "../assets/x.png";
import O from "../assets/o.png";

function Square(props) {
  const { value, col, row } = props;
  const dispatch = useDispatch();
  const { numberOfmoves, player, ROW, COL, board } = useSelector(
    (state) => state.game
  );
  const ARRATTACK = [0, 64, 4096, 262144, 16777216, 1073741824];
  const ARRDEFENSE = [0, 8, 512, 32768, 2097152, 134217728];

  const findMoveAi = () => {
    debugger
    let position = {};
    let maxPoint = 0;
    for (let i = 0; i < ROW; i++) {
      for (let j = 0; j < COL; j++) {
        let attackPoint = 0
        let defensePoint = 0
        if (board[i][j] === 0) {
          attackPoint += attackPoint_duyetDoc(i, j)
          attackPoint += attackPoint_duyetNgang(i, j)
          attackPoint += attackPoint_duyetCheoXuoi(i, j)
          attackPoint += attackPoint_duyetCheoNguoc(i, j)
          
          defensePoint += defensePoint_duyetDoc(i, j)
          defensePoint += defensePoint_duyetNgang(i, j) 
          defensePoint += defensePoint_duyetCheoXuoi(i, j)
          defensePoint += defensePoint_duyetCheoNguoc(i, j);

          if (attackPoint > defensePoint) {
            if (maxPoint < attackPoint) {
              maxPoint = attackPoint;
              position = {
                row: i,
                col: j,
              };
            }
          } else {
            if (maxPoint < defensePoint) {
              maxPoint = defensePoint;
              position = {
                row: i,
                col: j,
              };
            }
          }
        }
      }
    }
    debugger
    return position;
  };

  const attackPoint_duyetDoc = (currRow, currCol) => {
    let totalPoint = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    let soQuanTa2 = 0;
    let soQuanDich2 = 0;

    for (let count = 1; count < 6 && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol] === 1) {
        soQuanTa++;
      }
      if (board[currRow + count][currCol] === -1) {
        soQuanDich++;
        break;
      }
      if (board[currRow + count][currCol] === 0) {
        for (let count2 = 2; count2 < 7 && currRow + count2 < ROW; count2++) {
          if (board[currRow + count2][currCol] === 1) {
            soQuanTa2++;
          }
          if (board[currRow + count2][currCol] === -1) {
            soQuanDich2++;
            break;
          }
          if (board[currRow + count2][currCol] === 0) {
            break;
          }
        }
        break;
      }
    }
    for (let count = 1; count < 6 && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol] === 1) {
        soQuanTa++;
      }
      if (board[currRow - count][currCol] === -1) {
        soQuanDich++;
        break;
      }
      if (board[currRow - count][currCol] === 0) {
        for (let count2 = 2; count2 < 7 && currRow - count2 >= 0; count2++) {
          if (board[currRow - count2][currCol] === 1) {
            soQuanTa2++;
          }
          if (board[currRow - count2][currCol] === -1) {
            soQuanDich2++;
            break;
          }
          if (board[currRow - count2][currCol] === 0) {
            break;
          }
        }
        break;
      }
    }

    if (soQuanDich === 2) {
      return 0;
    }
    if (soQuanDich === 0) {
      totalPoint += ARRATTACK[soQuanTa] * 2;
    } else {
      totalPoint += ARRATTACK[soQuanTa];
    }

    if (soQuanDich2 === 0) {
      totalPoint += ARRATTACK[soQuanTa2] * 2;
    } else {
      totalPoint += ARRATTACK[soQuanTa2];
    }

    if (soQuanTa >= soQuanTa2) {
      totalPoint -= 1;
    } else {
      totalPoint -= 2;
    }

    if (soQuanTa === 4) {
      totalPoint *= 2;
    }
    if (soQuanTa === 0) {
      totalPoint += ARRDEFENSE[soQuanDich] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich];
    } 

    if (soQuanTa2 === 0) {
      totalPoint += ARRDEFENSE[soQuanDich2] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich2];
    }
    // totalPoint -= ARRDEFENSE[soQuanDich + 1];
    // totalPoint += ARRATTACK[soQuanTa];
    return totalPoint;
  };

  const attackPoint_duyetNgang = (currRow, currCol) => {
    let totalPoint = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    let soQuanTa2 = 0;
    let soQuanDich2 = 0;

    for (let count = 1; count < 6 && currCol + count < COL; count++) {
      if (board[currRow][currCol + count] === 1) {
        soQuanTa++;
      }
      if (board[currRow][currCol + count] === -1) {
        soQuanDich++;
        break;
      }
      if (board[currRow][currCol + count] === 0){
        for (let count2 = 2; count2 < 7 && currCol + count2 < COL; count2++) {
          if (board[currRow][currCol + count2] === 1) {
            soQuanTa2++;
          }
          if (board[currRow][currCol + count2] === -1) {
            soQuanDich2++;
            break;
          } 
          if (board[currRow][currCol + count2] === 0) {
            break;
          }
        }
        break;
      }
    }
    for (let count = 1; count < 6 && currCol - count >= 0; count++) {
      if (board[currRow][currCol - count] === 1) {
        soQuanTa++;
      }
      if (board[currRow][currCol - count] === -1) {
        soQuanDich++;
        break;
      }
      if (board[currRow][currCol - count] === 0) {
        for (let count2 = 2; count2 < 7 && currCol - count2 >= 0; count2++) {
          if (board[currRow][currCol - count2] === 1) {
            soQuanTa2++;
          }
          if (board[currRow][currCol - count2] === -1) {
            soQuanDich2++;
            break;
          }
          if(board[currRow][currCol - count2] === 0){
            break;
          }
        }
        break;
      }
    }

    if (soQuanDich === 2) {
      return 0;
    }
    if (soQuanDich === 0) {
      totalPoint += ARRATTACK[soQuanTa] * 2;
    } else {
      totalPoint += ARRATTACK[soQuanTa];
    }
    if (soQuanDich2 === 0) {
      totalPoint += ARRATTACK[soQuanTa2] * 2;
    } else {
      totalPoint += ARRATTACK[soQuanTa2];
    }

    if (soQuanTa >= soQuanTa2) {
      totalPoint -= 1;
    } else {
      totalPoint -= 2;
    }

    if (soQuanTa === 4) {
      totalPoint *= 2;
    }

    if (soQuanTa === 0) {
      totalPoint += ARRDEFENSE[soQuanDich] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich];
    }

    if (soQuanTa2 === 0) {
      totalPoint += ARRDEFENSE[soQuanDich2] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich2];
    }

    // totalPoint -= ARRDEFENSE[soQuanDich + 1];
    // totalPoint += ARRATTACK[soQuanTa];
    return totalPoint;
  };

  const attackPoint_duyetCheoXuoi = (currRow, currCol) => {
    let totalPoint = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    let soQuanTa2 = 0;
    let soQuanDich2 = 0;

    for (let count = 1; count < 6 && currCol + count < COL && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol + count] === 1) {
        soQuanTa++;
      }
      if (board[currRow + count][currCol + count] === -1) {
        soQuanDich++;
        break;
      }
      if (board[currRow + count][currCol + count] === 0) {
        for ( let count2 = 2; count2 < 7 && currCol + count2 < COL && currRow + count2 < ROW; count2++) {
          if (board[currRow + count2][currCol + count2] === 1) {
            soQuanTa2++;
          }
          if (board[currRow + count2][currCol + count2] === -1) {
            soQuanDich2++;
            break;
          } 
          if(board[currRow + count2][currCol + count2] === 0) {
            break;
          }
        }
        break;
      }
    }
    for ( let count = 1; count < 6 && currCol - count >= 0 && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol - count] === 1) {
        soQuanTa++;
      }
      if (board[currRow - count][currCol - count] === -1) {
        soQuanDich++;
        break;
      } 
      if(board[currRow - count][currCol - count] === 0) {
        for ( let count2 = 2; count2 < 7 && currCol - count2 >= 0 && currRow - count2 >= 0; count2++) {
          if (board[currRow - count2][currCol - count2] === 1) {
            soQuanTa2++;
          }
          if (board[currRow - count2][currCol - count2] === -1) {
            soQuanDich2++;
            break;
          }
          if (board[currRow - count2][currCol - count2] === 0) {
            break;
          }
        }
        break;
      }
    }
    if (soQuanDich === 2) {
      return 0;
    }

    if (soQuanDich === 0) {
      totalPoint += ARRATTACK[soQuanTa] * 2;
    } else {
      totalPoint += ARRATTACK[soQuanTa];
    }

    if (soQuanDich2 === 0) {
      totalPoint += ARRATTACK[soQuanTa2] * 2;
    } else {
      totalPoint += ARRATTACK[soQuanTa2];
    }

    if (soQuanTa >= soQuanTa2) {
      totalPoint -= 1;
    } else {
      totalPoint -= 2;
    }

    if (soQuanTa === 4) {
      totalPoint *= 2;
    }

    if (soQuanTa === 0) {
      totalPoint += ARRDEFENSE[soQuanDich] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich];
    }

    if (soQuanTa2 === 0) {
      totalPoint += ARRDEFENSE[soQuanDich2] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich2];
    }

    // totalPoint -= ARRDEFENSE[soQuanDich + 1];
    // totalPoint += ARRATTACK[soQuanTa];
    return totalPoint;
  };

  const attackPoint_duyetCheoNguoc = (currRow, currCol) => {
    let totalPoint = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    let soQuanTa2 = 0;
    let soQuanDich2 = 0;
    for ( let count = 1; count < 6 && currCol + count < COL && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol + count] === 1) {
        soQuanTa++;
      }
      if (board[currRow - count][currCol + count] === -1) {
        soQuanDich++;
        break;
      }
      if(board[currRow - count][currCol + count] === 0) {
        for ( let count2 = 2; currCol + count2 < COL && currRow - count2 >= 0; count2++) {
          if (board[currRow - count2][currCol + count2] === 1) {
            soQuanTa2++;
          }
          if (board[currRow - count2][currCol + count2] === -1) {
            soQuanDich2++;
            break;
          }
          if (board[currRow - count2][currCol + count2] === 0) {
            break;
          }
        }
        break;
      }
    }
    for ( let count = 1; count < 6 && currCol - count >= 0 && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol - count] === 1) {
        soQuanTa++;
      }
      if (board[currRow + count][currCol - count] === -1) {
        soQuanDich++;
        break;
      }
      if (board[currRow + count][currCol - count] === 0) {
        for (let count2 = 2; count2 < 7 && currCol - count2 >= 0 && currRow + count2 < ROW; count2++) {
          if (board[currRow + count2][currCol - count2] === 1) {
            soQuanTa2++;
          }
          if (board[currRow + count2][currCol - count2] === -1) {
            soQuanDich2++;
            break;
          }
          if (board[currRow + count2][currCol - count2] === 0) {
            break;
          }
        }
        break;
      }
    }

    if (soQuanDich === 2) {
      return 0;
    }

    if (soQuanDich === 0) {
      totalPoint += ARRATTACK[soQuanTa] * 2;
    } else {
      totalPoint += ARRATTACK[soQuanTa];
    }

    if (soQuanDich2 === 0) {
      totalPoint += ARRATTACK[soQuanTa2] * 2;
    } else {
      totalPoint += ARRATTACK[soQuanTa2];
    }

    if (soQuanTa >= soQuanTa2) {
      totalPoint -= 1;
    } else {
      totalPoint -= 2;
    }

    if (soQuanTa === 4) {
      totalPoint *= 2;
    }

    if (soQuanTa === 0) {
      totalPoint += ARRDEFENSE[soQuanDich] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich];
    }

    if (soQuanTa2 === 0) {
      totalPoint += ARRDEFENSE[soQuanDich2] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich2];
    }

    // totalPoint -= ARRDEFENSE[soQuanDich + 1];
    // totalPoint += ARRATTACK[soQuanTa];
    return totalPoint;
  };

  const defensePoint_duyetDoc = (currRow, currCol) => {
    let totalPoint = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    let soQuanTa2 = 0;
    let soQuanDich2 = 0;
    for (let count = 1; count < 6 && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol] === 1) {
        soQuanTa++;
        break;
      }
      if (board[currRow + count][currCol] === -1) {
        soQuanDich++;
      } 
      if (board[currRow + count][currCol] === 0){
        for (let count2 = 2; count2 < 7 && currRow + count2 < ROW; count2++) {
          if (board[currRow + count2][currCol] === 1) {
            soQuanTa2++;
            break;
          }
          if (board[currRow + count2][currCol] === -1) {
            soQuanDich2++;
          }
          if (board[currRow + count2][currCol] === 0){
            break;
          }
        }
        break;
      }
    }
    for (let count = 1; count < 6 && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol] === 1) {
        soQuanTa++;
        break;
      }
      if (board[currRow - count][currCol] === -1) {
        soQuanDich++;
      }
      if (board[currRow - count][currCol] === 0) {
        for (let count2 = 2; count2 < 7 && currRow - count2 >= 0; count2++) {
          if (board[currRow - count2][currCol] === 1) {
            soQuanTa2++;
            break;
          }
          if (board[currRow - count2][currCol] === -1) {
            soQuanDich2++;
          }
          if (board[currRow - count2][currCol] === 0){
            break;
          }
        }
        break;
      }
    }

    if (soQuanTa === 2) {
      return 0;
    }

    if (soQuanTa === 0) {
      totalPoint += ARRDEFENSE[soQuanDich] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich];
    }

    if (soQuanTa2 === 0) {
      totalPoint += ARRDEFENSE[soQuanDich2] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich2];
    }

    if (soQuanDich >= soQuanDich2) {
      totalPoint -= 1;
    } else {
      totalPoint -= 2;
    }
    if (soQuanDich === 4) {
      totalPoint *= 2;
    }
    // totalPoint += ARRDEFENSE[soQuanDich];
    return totalPoint;
  };

  const defensePoint_duyetNgang = (currRow, currCol) => {
    let totalPoint = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    let soQuanTa2 = 0;
    let soQuanDich2 = 0;

    for (let count = 1; count < 6 && currCol + count < COL; count++) {
      if (board[currRow][currCol + count] === 1) {
        soQuanTa++;
        break;
      }
      if (board[currRow][currCol + count] === -1) {
        soQuanDich++;
      }
      if (board[currRow][currCol + count] === 0){
        for (let count2 = 2; count2 < 7 && currCol + count2 < COL; count2++) {
          if (board[currRow][currCol + count2] === 1) {
            soQuanTa2++;
            break;
          }
          if (board[currRow][currCol + count2] === -1) {
            soQuanDich2++;
          }
          if (board[currRow][currCol + count2] === 0){
            break;
          }
        }
        break;
      }
    }
    for (let count = 1; count < 6 && currCol - count >= 0; count++) {
      if (board[currRow][currCol - count] === 1) {
        soQuanTa++;
        break;
      }
      if (board[currRow][currCol - count] === -1) {
        soQuanDich++;
      }
      if (board[currRow][currCol - count] === 0){
        for (let count2 = 1; count2 < 7 && currCol - count2 >= 0; count2++) {
          if (board[currRow][currCol - count2] === 1) {
            soQuanTa2++;
            break;
          }
          if (board[currRow][currCol - count2] === -1) {
            soQuanDich2++;
          }
          if (board[currRow][currCol - count2] === 0) {
            break;
          }
        }
        break;
      }
    }

    if (soQuanTa === 2) {
      return 0;
    }

    if (soQuanTa === 0) {
      totalPoint += ARRDEFENSE[soQuanDich] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich];
    }
    if (soQuanTa2 === 0) {
      totalPoint += ARRDEFENSE[soQuanDich2] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich2];
    }

    if (soQuanDich >= soQuanDich2) {
      totalPoint -= 1;
    } else {
      totalPoint -= 2;
    }
    if (soQuanDich === 4) {
      totalPoint *= 2;
    }

    // totalPoint += ARRDEFENSE[soQuanDich];
    return totalPoint;
  };

  const defensePoint_duyetCheoXuoi = (currRow, currCol) => {
    let totalPoint = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    let soQuanTa2 = 0;
    let soQuanDich2 = 0;
    for (let count = 1; count < 6 && currCol + count < COL && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol + count] === 1) {
        soQuanTa++;
        break;
      }
      if (board[currRow + count][currCol + count] === -1) {
        soQuanDich++;
      }
      if (board[currRow + count][currCol + count] === 0){
        for (let count2 = 2; count2 < 7 && currCol + count2 < COL && currRow + count2 < ROW; count2++) {
          if (board[currRow + count2][currCol + count2] === 1) {
            soQuanTa2++;
            break;
          }
          if (board[currRow + count2][currCol + count2] === -1) {
            soQuanDich2++;
          }
          if (board[currRow + count2][currCol + count2] === 0) {
            break;
          }
        }
        break;
      }
    }
    for ( let count = 1; count < 6 && currCol - count >= 0 && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol - count] === 1) {
        soQuanTa++;
        break;
      }
      if (board[currRow - count][currCol - count] === -1) {
        soQuanDich++;
      }
      if (board[currRow - count][currCol - count] === 0){
        for (let count2 = 2; count < 7 && currCol - count2 >= 0 && currRow - count2 >= 0; count2++) {
          if (board[currRow - count2][currCol - count2] === 1) {
            soQuanTa2++;
            break;
          }
          if (board[currRow - count2][currCol - count2] === -1) {
            soQuanDich2++;
          }
          if (board[currRow - count2][currCol - count2] === 0) {
            break;
          }
        }
        break;
      }
    }
    if (soQuanTa === 2) {
      return 0;
    }

    if (soQuanTa === 0) {
      totalPoint += ARRDEFENSE[soQuanDich] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich];
    }

    if (soQuanTa2 === 0) {
      totalPoint += ARRDEFENSE[soQuanDich2] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich2];
    }

    if (soQuanDich >= soQuanDich2) {
      totalPoint -= 1;
    } else {
      totalPoint -= 2;
    }
    if (soQuanDich === 4) {
      totalPoint *= 2;
    }

    // totalPoint += ARRDEFENSE[soQuanTa];
    return totalPoint;
  };

  const defensePoint_duyetCheoNguoc = (currRow, currCol) => {
    let totalPoint = 0;
    let soQuanTa = 0;
    let soQuanDich = 0;
    let soQuanTa2 = 0;
    let soQuanDich2 = 0;
    for (let count = 1; count < 6 && currCol + count < COL && currRow - count >= 0; count++) {
      if (board[currRow - count][currCol + count] === 1) {
        soQuanTa++;
        break;
      }
      if (board[currRow - count][currCol + count] === -1) {
        soQuanDich++;
      }
      if (board[currRow - count][currCol + count] === 0){
        for (let count2 = 2; count2 < 7 && currCol + count2 < COL && currRow - count2 >= 0; count2++) {
          if (board[currRow - count2][currCol + count2] === 1) {
            soQuanTa2++;
            break;
          }
          if (board[currRow - count2][currCol + count2] === -1) {
            soQuanDich2++;
          }
          if (board[currRow - count2][currCol + count2] === 0){
            break;
          }
        }
        break;
      }
    }
    for (let count = 1; count < 6 && currCol - count >= 0 && currRow + count < ROW; count++) {
      if (board[currRow + count][currCol - count] === 1) {
        soQuanTa++;
        break;
      }
      if (board[currRow + count][currCol - count] === -1) {
        soQuanDich++;
      }
      if (board[currRow + count][currCol - count] === 0){
        for (let count2 = 2; count < 7 && currCol - count2 >= 0 && currRow + count2 < ROW; count2++) {
          if (board[currRow + count2][currCol - count2] === 1) {
            soQuanTa2++;
            break;
          }
          if (board[currRow + count2][currCol - count2] === -1) {
            soQuanDich2++;
          }
          if (board[currRow + count2][currCol - count2] === 0) {
            break;
          }
        }
        break;
      }
    }

    if (soQuanTa === 2) {
      return 0;
    }

    if (soQuanTa === 0) {
      totalPoint += ARRDEFENSE[soQuanDich] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich];
    }

    if (soQuanTa2 === 0) {
      totalPoint += ARRDEFENSE[soQuanDich2] * 2;
    } else {
      totalPoint += ARRDEFENSE[soQuanDich2];
    }

    if (soQuanDich >= soQuanDich2) {
      totalPoint -= 1;
    } else {
      totalPoint -= 2;
    }
    if (soQuanDich === 4) {
      totalPoint *= 2;
    }

    // totalPoint += ARRDEFENSE[soQuanTa];
    return totalPoint;
  };


  const handleClick = (row, col) => {
    if (!checkWin()) {
      if (board[row][col] !== 0) {
        return;
      }
      const position = { row, col };
      dispatch(ClickPlay(position));
      // let flag = checkWin()
      // // debugger
      // console.log(flag);
      if (!checkWin()) {
        if (player === -1) {
          let move = findMoveAi();
          console.log(move);
          dispatch(ClickPlay(move));
          checkWin();
        }
      }
    }
  };

  const checkWin = () => {
    if (numberOfmoves.length === COL * ROW) {
      dispatch({
        type: "Draw",
      });
      return true;
    }
    let flag;
    numberOfmoves.forEach((move) => {
      if (
        duyetDoc(move.row, move.col, board[move.row][move.col]) ||
        duyetNgang(move.row, move.col, board[move.row][move.col]) ||
        duyetCheoXuoi(move.row, move.col, board[move.row][move.col]) ||
        duyetCheoNguoc(move.row, move.col, board[move.row][move.col])
      ) {
        board[move.row][move.col] === -1
          ? dispatch({
              type: "Player",
            })
          : dispatch({
              type: "BOT",
            });
        console.log("result true");
        // debugger
        flag = true;
        return true;
      } else {
        return false;
      }
    });
    return flag || false;
  };

  const duyetDoc = (currRow, currCol, currPlayer) => {
    if (currRow > ROW - 5) {
      return false;
    }
    let count;
    for (count = 1; count < 5; count++) {
      if (board[currRow + count][currCol] !== currPlayer) {
        return false;
      }
    }
    if (currRow === 0 || currRow + count === ROW) {
      return true;
    }
    if (
      board[currRow - 1][currCol] === 0 ||
      board[currRow + count][currCol] === 0
    ) {
      return true;
    }
    return false;
  };

  const duyetCheoXuoi = (currRow, currCol, currPlayer) => {
    if (currRow > ROW - 5 || currCol > COL - 5) {
      return false;
    }
    let count;
    for (count = 1; count < 5; count++) {
      if (board[currRow + count][currCol + count] !== currPlayer) {
        return false;
      }
    }
    if (
      currRow === 0 ||
      currRow + count === ROW ||
      currCol === 0 ||
      currCol + count === COL
    ) {
      return true;
    }
    if (
      board[currRow - 1][currCol - 1] === 0 ||
      board[currRow + count][currCol + count] === 0
    ) {
      return true;
    }
    return false;
  };

  const duyetCheoNguoc = (currRow, currCol, currPlayer) => {
    if (currRow < 4 || currCol > COL - 5) {
      return false;
    }
    let count;
    for (count = 1; count < 5; count++) {
      if (board[currRow - count][currCol + count] !== currPlayer) {
        return false;
      }
    }
    if (
      currRow === 4 ||
      currRow === ROW - 1 ||
      currCol === 0 ||
      currCol + count === COL
    ) {
      return true;
    }

    if (
      board[currRow + 1][currCol - 1] === 0 ||
      board[currRow - count][currCol + count] === 0
    ) {
      return true;
    }
    return false;
  };

  const duyetNgang = (currRow, currCol, currPlayer) => {
    if (currCol > COL - 5) {
      return false;
    }
    let count;
    for (count = 1; count < 5; count++) {
      if (board[currRow][currCol + count] !== currPlayer) {
        return false;
      }
    }
    if (currCol === 0 || currCol + count === COL) {
      return true;
    }
    if (
      board[currRow][currCol - 1] === 0 ||
      board[currRow][currCol + count] === 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="square" onClick={() => handleClick(row, col)}>
      {/* <div className={value === 1 ? "X square" : value === 2 ? "O square": "square"} onClick={() => botAuToPlay()}> */}
      {value === -1 ? (
        <img src={X} alt="" />
      ) : value === 1 ? (
        <img src={O} alt="" />
      ) : (
        ""
      )}
    </div>
  );
}

export default Square;
