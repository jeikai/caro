import logo from './logo.svg';
import Game from './component/Game';
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store = {store}>
      <Game />
    </Provider>
  );
}

export default App;
