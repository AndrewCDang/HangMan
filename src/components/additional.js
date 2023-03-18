import { useSelector } from "react-redux";
import { useEffect } from "react";

const Additional = () => {
    const triesLeft = useSelector(state => state.hangManGame.triesLeft)

    const buttonToggle = () => {
        const instructions = document.getElementsByClassName('instructions-container')[0];
        const background = document.getElementsByClassName('whiteBackground')[0];

        instructions.classList.toggle('show');
        background.classList.toggle('show');
        background.classList.toggle('z-1');
    }

    useEffect(()=>{
        const closeInstructions = document.getElementById('close-instr')
        closeInstructions.addEventListener('click', buttonToggle)
    },[])

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
        </div>
    )
}

export default Additional;