/* eslint-disable */

import Confetti1 from './confetti1';
import Confetti2 from './confetti2';
import Confetti3 from './confetti3';
import { useSelector } from "react-redux";



const WinState = () => {
    // Checking win state, if true, activates confetti animation
    const winCheck = useSelector(state => state.hangManGame.win)
    // Math Floor function getting random number between two points
    function getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min);
    }
    let winItems = [];
    const confettiNum = "ontouchstart" in document.documentElement ? 10 : 250;
    for(let i=0; i<confettiNum; i++){
        // Assigning animation delay for each element
        const delay = getRandomArbitrary(0,25000).toFixed()
         // Assign random animation (1-3)
        let winAnimation;
        const randomAni = getRandomArbitrary(1, 3).toFixed()
        switch (randomAni) {
            case '1':
                winAnimation = <Confetti1 delay={delay}/>
                break;
            case '2':
                winAnimation = <Confetti2 delay={delay}/>
                break;
            case '3':
                winAnimation = <Confetti3 delay={delay}/>
                break;
            default:
                winAnimation = null;
        };
        winItems.push(winAnimation);
    }
    // Rendering/Creating items using array.map() method
    const winElements = winItems.map((item, index) => {
        // Assigning Random Position
        const leftValue = getRandomArbitrary(-100,50).toFixed(2);
        // Assigning Random Colour
        const colorValue = getRandomArbitrary(1,5).toFixed();
        let color;
        switch (colorValue) {
            case '1':
                color = 'red'
                break;
            case '2':
                color = 'blue'
                break;
            case '3':
                color = 'yellow'
                break;
            case '4':
                color = 'green'
                break;
            case '5':
                color = 'purple'
                break;
            default:
                null;
        }
        // Assigning random scale
        const scale = getRandomArbitrary(0,4).toFixed()
        // Combining styles
        const styleAll = {
            left: `${leftValue}%`,
        };
        // Flipping half of the animations for better visual/more natural effect
        const decideFlip = getRandomArbitrary(0,1).toFixed();
        let flip;
        (decideFlip ==1 )? flip = 'flip': flip ='';

        // Combining styles into single class element - styling class when I need to style rectangle inside the svg itself
        const classAll = `confetti ${color} ${flip} scale${scale}`
        return (
            <div className={classAll} key={index} style={styleAll}>{item}</div>
        );
    })
    if (winCheck){
        return(
            <div className="win-container">
                {winElements}
            </div>
        )
    }
}

export default WinState

