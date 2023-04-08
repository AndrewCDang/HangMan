import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { correctInput, requiredGuessesInput, toggleWin, incorrectTry } from '../store/hangMan';
import correct from '../sounds/correct.wav';
import incorrect from '../sounds/incorrect.wav';
import bonk from '../sounds/bonk.flac';
import scatter from '../sounds/scatter.wav';
import sweep from '../sounds/sweep.wav';
import win from '../sounds/win.wav';
import drum from '../sounds/drumRoll.wav';
import score from '../sounds/score.wav'

const Tracker = () => {
    // Getting state values
    const dispatch = useDispatch();
    const guessWord = useSelector(state => state.hangManGame.guessWord);
    const correctGuesses = useSelector(state => state.hangManGame.correctInputs);
    const guessesRequired = useSelector(state => state.hangManGame.guessesRequired);
    const triesLeft = useSelector(state => state.hangManGame.triesLeft );
    const winCheck = useSelector(state => state.hangManGame.win);

    // Importing Sounds
    const correctSound = () => {
        const correctAudio = new Audio(correct)
        correctAudio.volume = 0.05;
        correctAudio.play()
    }
    const incorrectSound = () => {
        const incorrectAudio = new Audio(incorrect)
        incorrectAudio.volume = 0.15;
        incorrectAudio.play()
    }
    const bonkSound = () => {
        const bonkSound = new Audio(bonk);
        bonkSound.volume = 0.15
        bonkSound.play()
    }
    const scatterSound = () => {
        const scatterSound = new Audio(scatter);
        scatterSound.volume = 0.15
        scatterSound.play()
    }
    const sweepSound = () => {
        const sweepSound = new Audio(sweep);
        sweepSound.volume = 0.15
        sweepSound.play()
    }
    const winSound = () => {
        const winSound = new Audio(win);
        winSound.volume = 0.15
        winSound.play()
    }
    const drumRoll = () => {
        const drumRoll = new Audio(drum);
        drumRoll.volume = 0.05
        drumRoll.play()
    }
    const scoreSound = () => {
        const scoreSound = new Audio(score)
        scoreSound.volume = 0.05;
        scoreSound.play()
    }

    // Function at end game- Combining Letters animation
    const endGame = () =>{
        const allLetters = [...document.getElementsByClassName('randomWord')];
        const lettersContainer = document.getElementsByClassName('randomWord-container')[0];
        lettersContainer.classList.add('randomWord-container-end');
        sweepSound();
        for(let i=0; i<allLetters.length;i++){
            allLetters[i].classList.add('randomWord-end')
        }
        const hint = document.getElementsByClassName('definition-container')[0];
        hint.classList.add('definition-show');
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

    // Use effect checks if clicked input matches character of guess word and applies correct/incorrect style accordingly.
    // Updating correctInput number if input character matches a character from the guess word.
    // If input is not correct, incorrectTry state is updated +1

    useEffect(()=>{
        
        const inputCheck = (e) => {
            // e.preventDefault();
            // alert(e.target.textContent.toLowerCase())

            if (guessWord.includes(e.target.textContent.toLowerCase())) {
                e.target.classList.add("correct-input");
                correctSound();
                // Calls function which matches input letter to hidden letters
                dispatch(correctInput())
                displayLetters(e.target.textContent.toLowerCase())
            }else{
                e.target.classList.add("incorrect-input");
                dispatch(incorrectTry())
                incorrectSound()

            }
        };
        const displayLetters = (letter) => {
            const allLetters = [...document.getElementsByClassName('randomWord')]
            const matchedLetters = allLetters.filter((item)=>{
                return item.textContent == letter;
            })
            // Reveals all instances of matched letter
            for(let i=0; i<matchedLetters.length; i++){
                matchedLetters[i].classList.add('displayWord')
            }
        }

        const keyBtns = document.getElementsByClassName("keyboard-item");
        for (let i = 0; i < keyBtns.length; i++) {
        keyBtns[i].addEventListener("click", inputCheck);
        }

        const mobileKeyBtns = document.getElementsByClassName("keyboard-item");
        for (let i = 0; i < mobileKeyBtns.length; i++) {
            mobileKeyBtns[i].addEventListener("touchstart", inputCheck);
        }

        // Cleanup function removes the event listener
        return () => {
            for (let i = 0; i < keyBtns.length; i++) {
            keyBtns[i].removeEventListener("click", inputCheck);
            }

            for (let i = 0; i < mobileKeyBtns.length; i++) {
                mobileKeyBtns[i].removeEventListener("touchstart", inputCheck);
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
            setTimeout(()=>{
                for(let i=0; i < remainingLetters.length; i++){
                    remainingLetters[i].classList.add('displayWord-defeat')
                }
                endGame();
            },2750);
            // Clearing keyboard
            setTimeout(()=>{
                scatterSound();
                for(let i=0; i<keyboard.length; i++){
                    const delay = getRandomArbitrary(0,1000);
                    setTimeout(()=>{
                        keyboard[i].classList.add('keyboard-remove')
                    },delay)
                };
            },5800)
            // Syncing bonk sounds to animation
            setTimeout(()=>{
                bonkSound()
            },4900)
            setTimeout(()=>{
                bonkSound()
            },5950)
            
        }
    },[triesLeft])

    // Conditions to win game, if met, toggleWin state.
    useEffect(()=>{
        if(correctGuesses == guessesRequired && guessesRequired !==0){
            dispatch(toggleWin())
        };
    },[correctGuesses])

    // Use effect that that executes function 'endGame()' when 'win'' state = true.
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
            winSound();
            setTimeout(()=>{
                drumRoll()
            },1500)
            setTimeout(()=>{
                scoreSound()
            },3310)
        };

    },[winCheck])


    return(null)
}
export default Tracker;