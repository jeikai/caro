const ClickPlay = (position) => {
  return {
    type: 'ClickPlay',
    payload: position
  }
}
const gameOver = () => {
  return {
    type: 'GameOver',
  }
}
export {ClickPlay, gameOver}