import './App.css';
import HangManSvg from './components/hangManSvg';
import WinState from './components/winState';
import Dictionary from './components/dictionary';
import Keyboard from './components/keyboard';
import Tracker from './components/tracker';
import Additional from './components/additional';
import Instructions from './components/instructions';
import Background from './components/background';
import Replay from './components/replay'
import Keydown from './components/keydown'

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <div className='displayContainer'>
          {/*  */}
          <HangManSvg />
        </div>
        <div className='inputsContainer'>
          <Dictionary />
        </div>
        <div className='inputsContainer'>
          <Keyboard />
          <Instructions />
          <Replay />
          <Additional />
          <Tracker />
          <Background/>
        </div>
        <WinState/>
      </header>
    </div>
  );
}

export default App;
