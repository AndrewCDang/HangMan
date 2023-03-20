
import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux";
import { correctInput } from "../store/hangMan";



const Keydown = () =>{
    const dispatch = useDispatch();
    const guessWord = useSelector(state => state.hangManGame.guessWord);


    const [text, setText] = useState("");

    const handleKeyPress = event => {
    setText(`${event.key}`);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);

        return () => {
        window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(()=>{
        if(text == 't'){
            console.log(text)
            dispatch(correctInput())
        }
    },[text])
   

    // if (guessWord.includes(e.target.innerText.toLowerCase())) {
    //     e.target.classList.add("correct-input");
    //     correctSound();
    //     // Calls function which matches input letter to hidden letters
    //     dispatch(correctInput())
    //     displayLetters(e.target.innerText.toLowerCase())
    // }


    // useEffect(()=>{
    //     const keydownDiv = document.getElementsByClassName('keydown')[0];
    //     keydownDiv.focus();

    //     keydownDiv.addEventListener('keydown', function(event) {
    //         if (/^[a-zA-Z]$/.test(event.key)) {
    //           const keyInput = event.key.toLocaleLowerCase();
    //           console.log(keyInput)
    //           setKeyPress(keyInput);
    //           console.log(keyPress)

    //         }
    //       });
    // },[])

    
    return(
        <div 
    className="keydown"
    tabIndex={0}></div>
    )
    
    
    
}

export default Keydown

// const [state, setState] = useState("");
// const inputRef = useRef();
// const handleChange = (e) => setState(e.target.value);
