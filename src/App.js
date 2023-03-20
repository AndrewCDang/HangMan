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
          {/* Component displaying Hang Man animted SVG (animations self-produced via SVGator) */}
          <HangManSvg />
        </div>
        <div className='inputsContainer'>
          {/* Dictionary Component, filtering out words based on length */}
          <Dictionary />
        </div>
        <div className='inputsContainer'>
          {/* Component displays on screen keyboard built via map method */}
          <Keyboard />
          {/* Component that toggles instruction on screen */}
          <Instructions />
          {/* Replay button and appropriate win/defeat component displayed when 'winState' is true */}
          <Replay />
          {/* Buttons at bottom of screen */}
          <Additional />
          {/* Tracks the states of correct inputs, tries remaining and dispatches appropiate actions */}
          <Tracker />
          {/* Background related to 'instructions' component, blurs background items when instructions are displayed */}
          <Background/>
        </div>
        {/* Component dealing with victory confetti animation */}
        <WinState/>
      </header>
    </div>
  );
}

export default App;
