import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Replay = () => {
    const winCheck = useSelector(state => state.hangManGame.win);
    const triesLeft = useSelector(state => state.hangManGame.triesLeft);
    const [ winMessage, setWinMessage ] = useState('Unlucky');

    console.log(winCheck)
    console.log(triesLeft)

    // Displays 'lose' replay message when tries left is '0'
    useEffect(()=>{
        if(triesLeft==0){
            const svgDisplay = document.getElementsByClassName('displayContainer')[0];
            const replayContainer = document.getElementsByClassName('replay-container')[0]
            setInterval(()=>{
                replayContainer.classList.add('replay-active')
                svgDisplay.classList.add('hide-svg')
            },7500)
        }
    },[triesLeft])
    

    // Displays 'win' replay message win state is true
    useEffect(()=>{
        const replayContainer = document.getElementsByClassName('replay-container')[0];
        const svgDisplay = document.getElementsByClassName('displayContainer')[0];
        if(winCheck){
            setInterval(()=>{
                setWinMessage('Congratulations!');
                replayContainer.classList.add('win-color');
                replayContainer.classList.add('replay-active')
                svgDisplay.classList.add('hide-svg')
            },1500)

        }
    },[winCheck])

    return(
        <div className="replay-container">
            <div className="heading">{winMessage}</div>
            <button className="restart-btn" onClick={()=>window.location.reload()}>Restart</button>
        </div>
    )
}
export default Replay;