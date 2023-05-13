// const BOT = 1;
const PLAYER = -1;
const BOARD_SIZE = 15;

const initialState = {
  start: false,
  COL: BOARD_SIZE,
  ROW: BOARD_SIZE,
  player: PLAYER,
  board: Array(BOARD_SIZE)
    .fill()
    .map(() => Array(BOARD_SIZE).fill(0)),
  winner: null,
  numberOfmoves: [],
  numberOfChangeMoves: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ClickPlay":
      let newBoard = state.board;
      if (newBoard[action.payload.row][action.payload.col] === 0) {
        newBoard[action.payload.row][action.payload.col] = state.player;
        const move = {
          row: action.payload.row,
          col: action.payload.col,
          value: state.player,
        };
        let listMove = state.numberOfmoves;
        listMove.push(move);
        return {
          ...state,
          board: newBoard,
          player: -state.player,
          numberOfmoves: listMove,
        };
      }
      return { ...state };
    case "Draw":
      return { ...state, winner: "Hòa cờ" };
    case "Player":
      return { ...state, winner: "You win" };
    case "BOT":
      return { ...state, winner: "You lose" };
    case "reset":
      return {
        start: false,
        COL: BOARD_SIZE,
        ROW: BOARD_SIZE,
        player: PLAYER,
        board: Array(BOARD_SIZE)
          .fill()
          .map(() => Array(BOARD_SIZE).fill(0)),
        winner: null,
        numberOfmoves: [],
      };
    case "undo":
      if (state.numberOfmoves.length > 0) {
        let moveUndo;
        let newListChanges;
        let newBoard = state.board;
        for (let i = 0; i < 2; i++) {
          moveUndo = state.numberOfmoves.pop();
          newListChanges = state.numberOfChangeMoves;
          newListChanges.push(moveUndo);
          newBoard[moveUndo.row][moveUndo.col] = 0;
        }
        return {
          ...state,
          board: newBoard,
          numberOfChangeMoves: newListChanges,
        };
      }
      break;
    case "redo":
      if (state.numberOfChangeMoves.length > 0) {
        let newBoard = state.board;
        let listMove = state.numberOfmoves;
        let listMoveChange = state.numberOfChangeMoves;
        let moveRedo;
        for (let i = 0; i < 2; i++) {
          moveRedo = listMoveChange.pop();
          listMove.push(moveRedo);
          newBoard[moveRedo.row][moveRedo.col] = moveRedo.value;
        }
        return {
          ...state,
          board: newBoard,
          numberOfmoves: listMove,
          numberOfChangeMoves: listMoveChange,
        };
      }
      break;
    case "startGame":
      if (!state.start) {
        return { ...state, start: true };
      }
      break
    default:
      return { ...state };
  }
};

export default gameReducer;
