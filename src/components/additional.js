import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { incorrectTry } from "../store/hangMan";
import incorrect from '../sounds/incorrect.wav'


const Additional = () => {
    const dispatch = useDispatch()
    // Importing initial states of variables
    const triesLeft = useSelector(state => state.hangManGame.triesLeft);

    // Button toggles white blurred background when instructions banner is revealed
    const buttonToggle = () => {
        const instructions = document.getElementsByClassName('instructions-container')[0];
        const background = document.getElementsByClassName('whiteBackground')[0];
        instructions.classList.toggle('show');
        background.classList.toggle('show');
        background.classList.toggle('z-1');
    }
    // Button calls function to reveal hint and reduce state of lives by 2.
    const incorrectSound = () => {
        const incorrectAudio = new Audio(incorrect)
        incorrectAudio.volume = 0.15;
        incorrectAudio.play()
    }

    const showHint= () => {
        const hint = document.getElementsByClassName('definition-container')[0];
        const hintBtn = document.getElementsByClassName('help-btn')[1]
        hint.classList.add('definition-show');
        hintBtn.classList.add('no-pointer')
        hintBtn.classList.add('opacity-05')
        dispatch(incorrectTry());
        incorrectSound()

        // Delaying second life lost using setTimeout() - allowing animation to play out
        setTimeout(() => {
            dispatch(incorrectTry());
            incorrectSound()
        }, 1500);
    }

    // Adding event listeners on load
    useEffect(()=>{
        const closeInstructions = document.getElementById('close-instr');
        closeInstructions.addEventListener('click', buttonToggle);

        // Returning a cleanup function to remove the event listener
        return () => {
            closeInstructions.removeEventListener('click', buttonToggle);
        };
    },[])

    useEffect(()=>{
        if(triesLeft<= 2){
            const hintBtn = document.getElementsByClassName('help-btn')[1]
            hintBtn.classList.add('no-pointer')
            hintBtn.classList.add('opacity-05')
        }
    },[triesLeft])


    return(
        <div className="additional-container">
            <div className="tries-left">
                <p>Lives Left:</p>
                <p className="bold">{triesLeft}</p>
            </div>
            <div>|
            </div>
            <div>
                <button className="help-btn" onClick={()=>buttonToggle()}>How to Play</button>
            </div>
            <div>|
            </div>
            <div>
                <button className="help-btn" onClick={()=>showHint()}>Hint ( -2 lives )</button>
            </div>
            <div>|
            </div>
            <div>
            <svg id="reloadBtn" onClick={()=>window.location.reload()} fill="#000000" width="30px" height="30px" viewBox="-7.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>restart</title>
                <path d="M15.88 13.84c-1.68-3.48-5.44-5.24-9.040-4.6l0.96-1.8c0.24-0.4 0.080-0.92-0.32-1.12-0.4-0.24-0.92-0.080-1.12 0.32l-1.96 3.64c0 0-0.44 0.72 0.24 1.040l3.64 1.96c0.12 0.080 0.28 0.12 0.4 0.12 0.28 0 0.6-0.16 0.72-0.44 0.24-0.4 0.080-0.92-0.32-1.12l-1.88-1.040c2.84-0.48 5.8 0.96 7.12 3.68 1.6 3.32 0.2 7.32-3.12 8.88-1.6 0.76-3.4 0.88-5.080 0.28s-3.040-1.8-3.8-3.4c-0.76-1.6-0.88-3.4-0.28-5.080 0.16-0.44-0.080-0.92-0.52-1.080-0.4-0.080-0.88 0.16-1.040 0.6-0.72 2.12-0.6 4.36 0.36 6.36s2.64 3.52 4.76 4.28c0.92 0.32 1.84 0.48 2.76 0.48 1.24 0 2.48-0.28 3.6-0.84 4.16-2 5.92-7 3.92-11.12z"></path>
            </svg>
            </div>
        </div>
    )
}

export default Additional;