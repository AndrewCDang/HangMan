import { createSlice } from "@reduxjs/toolkit";


// Initialised createslice function to set initial state and reducers.
export const hangManGame = createSlice({
    name: "hangMan",

    initialState: {
        triesLeft: 9,
        win: false,
        guessWord: '',
        currentLetter: '?',
        correctInputs: 0,
        guessesRequired: 0,
        definition: '',
    },
    reducers:{
        incorrectTry: (state) => {
            state.triesLeft -= 1;
        },
        toggleWin: (state) => {
            state.win = !state.win;
        },
        inputGuessWord: (state, action) => {
            state.guessWord = action.payload;
        },
        inputLetter: (state, action) => {
            state.currentLetter = action.payload
        },
        correctInput: (state) => {
            state.correctInputs +=1;
        },
        requiredGuessesInput: (state, action) => {
            state.guessesRequired = action.payload;
        },
        inputDefinition: (state, action) => {
            state.definition = action.payload;
        }

    }
})
// CreatSlice generating actions and reducer objects which I destructure. 
export const { incorrectTry, toggleWin, inputGuessWord, inputLetter, correctInput, requiredGuessesInput, inputDefinition } = hangManGame.actions;
export default hangManGame.reducer;