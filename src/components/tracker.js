import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { correctInput, requiredGuessesInput, toggleWin, incorrectTry } from '../store/hangMan';


const Tracker = () => {
    // Getting state values
    const dispatch = useDispatch();
    const guessWord = useSelector(state => state.hangManGame.guessWord);
    const inputLetter = useSelector(state => state.hangManGame.currentLetter);
    const correctGuesses = useSelector(state => state.hangManGame.correctInputs);
    const guessesRequired = useSelector(state => state.hangManGame.guessesRequired);
    const triesLeft = useSelector(state => state.hangManGame.triesLeft )
    const winCheck = useSelector(state => state.hangManGame.win)


    // Function at end game- Combining Letters animation
    const endGame = () =>{
        const allLetters = [...document.getElementsByClassName('randomWord')];
        const lettersContainer = document.getElementsByClassName('randomWord-container')[0];
        lettersContainer.classList.add('randomWord-container-end');
        for(let i=0; i<allLetters.length;i++){
            allLetters[i].classList.add('randomWord-end')
        }
    }
    // Randomiser function
    function getRandomArbitrary(min, max) {
        return (Math.random() * (max - min) + min);
    }

    // Removing duplicates from guessWord, to count how many successful guesses are required.
    // Using indexOf() function to check if the first instance of the word matches the index number.
    useEffect(()=>{
        let charArray = guessWord.split('');
        charArray = charArray.filter(function(value, index, self) { 
            return self.indexOf(value) === index;
        }).join('');
        // Setting amount of correct guesses required in the reducer
        dispatch(requiredGuessesInput(charArray.length));
    },[guessWord])

    // Updating correctInput number if input character matches a character from the guess word.
    // If input is not correct, incorrectTry state is updated +1
    useEffect(()=>{
        if(guessWord.includes(inputLetter)){
            dispatch(correctInput())
        }else{
            dispatch(incorrectTry())
        }

        // Statement checking if number of correct inputs matches number of requried correct inputs
        // If matching, set 'win' state to true. I have to add '1' to correct guesses because both if statements are computed at the same time.
        if((correctGuesses + 1) == guessesRequired && guessesRequired !== 0){
            dispatch(toggleWin())
        }
    },[inputLetter])

    // Use effect that is dependement on 'guessword' state initially. Checks if clicked input matches character of guess word and applies style accordingly.
    useEffect(()=>{
        const inputCheck = (e) => {
            if (guessWord.includes(e.target.innerText.toLowerCase())) {
                e.target.classList.add("correct-input");
                displayLetters(e.target.innerText.toLowerCase())
            }else{
                e.target.classList.add("incorrect-input");
            }
        };
        const displayLetters = (letter) => {
            const allLetters = [...document.getElementsByClassName('randomWord')]
            const matchedLetters = allLetters.filter((item)=>{
                return item.innerText == letter;
            })
            for(let i=0; i<matchedLetters.length; i++){
                matchedLetters[i].classList.add('displayWord')
            }
        }

        const keyBtns = document.getElementsByClassName("keyboard-item");
        for (let i = 0; i < keyBtns.length; i++) {
        keyBtns[i].addEventListener("click", inputCheck);
        }

        //Cleanup function removes the event listener
        return () => {
            for (let i = 0; i < keyBtns.length; i++) {
            keyBtns[i].removeEventListener("click", inputCheck);
            }
        };
    },[guessWord])

    // Use effect that tracks 'triesLeft' state. If it reaches 0, code is executed indicating user has lost the game
    useEffect(()=>{
        if(triesLeft == 0){
            const allLetters = [...document.getElementsByClassName('randomWord')];
            const keyboard =[...document.getElementsByClassName('keyboard-item')];
            const additional = document.getElementsByClassName('additional-container')[0];
            // Hiding bottom info bar
            additional.classList.add('keyboard-remove-2')
            // Filtering remaining elements which has not been revealed yet
            const remainingLetters = allLetters.filter(letter => {
                return !letter.classList.contains('displayWord')
            });
            // Disables further input
            for(let i=0; i < keyboard.length; i++){
                keyboard[i].classList.add('no-pointer')
            }
            // Displaying remaining hidden words after delay
            setInterval(()=>{
                for(let i=0; i < remainingLetters.length; i++){
                    remainingLetters[i].classList.add('displayWord-defeat')
                }
                endGame();
            },2750);
            // Clearing keyboard
            setInterval(()=>{
                for(let i=0; i<keyboard.length; i++){
                    const delay = getRandomArbitrary(0,1000);
                    setInterval(()=>{
                        keyboard[i].classList.add('keyboard-remove')
                    },delay)
                }
            },5800)
            
        }
    },[triesLeft])

    // Use effect that that executes code when 'win'' state = true.
    useEffect(()=>{
        if(winCheck){
            // Disables further input
            const keyboard =[...document.getElementsByClassName('keyboard-item')];
            const additional = document.getElementsByClassName('additional-container')[0];
            for(let i=0; i < keyboard.length; i++){
                keyboard[i].classList.add('no-pointer')
                keyboard[i].classList.add('keyboard-remove-2')
            }
            additional.classList.add('keyboard-remove-2')
            endGame();
        };

    },[winCheck])


    return(null)
}
export default Tracker;