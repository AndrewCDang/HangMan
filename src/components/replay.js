import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Replay = () => {
    const winCheck = useSelector(state => state.hangManGame.win);
    const triesLeft = useSelector(state => state.hangManGame.triesLeft);
    const guessWord = useSelector(state => state.hangManGame.guessWord);
    const [ winMessage, setWinMessage ] = useState('Unlucky');
    // Displays 'lose' replay message when tries left is '0'
    useEffect(()=>{
        if(triesLeft==0){
            const svgDisplay = document.getElementsByClassName('displayContainer')[0];
            const replayContainer = document.getElementsByClassName('replay-container')[0]
            const pointCalc = document.getElementsByClassName('point-calc')[0]
            pointCalc.style.display ='none'
            setInterval(()=>{
                replayContainer.classList.add('replay-active')
                svgDisplay.classList.add('hide-svg')
            },7500)
        }
    },[triesLeft])
    
    const [points, setPoints] = useState('0');

    // Displays 'win' replay message win state is true
    useEffect(()=>{
        const replayContainer = document.getElementsByClassName('replay-container')[0];
        const winBg = document.getElementsByClassName('win-background')[0];

        const svgDisplay = document.getElementsByClassName('displayContainer')[0];
        if(winCheck){
            setTimeout(()=>{
                setWinMessage('Congratulations!');
                winBg.classList.add('win-color');
                replayContainer.classList.add('replay-active')
                svgDisplay.classList.add('hide-svg')
                // Displays Points
                const points = (triesLeft*1000) + (guessWord.length * 500);
                const pointsArray=[];
                for(let i = 0; i<=points; i++){
                    pointsArray.push(i)
                };
                // Displays points consecutively over 3 seconds
                pointsArray.forEach(point => {
                    setTimeout(()=>{
                        setPoints(point)
                    },parseInt(2200 * point/points))
                })
            },1500)

        }
    },[winCheck]);

    

    return(
        <div className="replay-container">
            <div>
                <div className="win-background">
                    <div className="heading">{winMessage}</div>
                </div>
                <div className="points-text points-num">{points}</div>
                <div className="points-text"><strong>Points</strong></div>
                <div className="points-sub-text points-text point-calc">{triesLeft}(tries left) x 1000 + {guessWord.length}(letters) x 500</div>
            </div>
            <button className="restart-btn" onClick={()=>window.location.reload()}>Restart</button>
        </div>
    )
}
export default Replay;