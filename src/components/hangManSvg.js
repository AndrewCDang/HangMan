/* eslint-disable */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// Importing States of SVG
import State1 from './svgStates/state1';
import State2 from './svgStates/state2';
import State3 from './svgStates/state3';
import State4 from './svgStates/state4';
import State5 from './svgStates/state5';
import State6 from './svgStates/state6';
import State7 from './svgStates/state7';
import State8 from './svgStates/state8';
import State9 from './svgStates/state9';



const HangManSvg = () => {
    const [svgComponent, setSvgComponent] = useState(null);
    const triesLeft = useSelector(state => state.hangManGame.triesLeft);

    useEffect(() => {
        switch (triesLeft) {
            case 8:
                setSvgComponent(<State1 />);
                break;
            case 7:
                setSvgComponent(<State2 />);
                break;
            case 6:
                setSvgComponent(<State3 />);
                break;
            case 5:
                setSvgComponent(<State4 />);
                break;
            case 4:
                setSvgComponent(<State5 />);
                break;
            case 3:
                setSvgComponent(<State6 />);
                break;
            case 2:
                setSvgComponent(<State7 />);
                break;
            case 1:
                setSvgComponent(<State8 />);
                break;
            case 0:
                setSvgComponent(<State9 />);
                break;
            default:
                setSvgComponent(null);
                break;
        }
    }, [triesLeft]);   

    return svgComponent;
};


export default HangManSvg;
