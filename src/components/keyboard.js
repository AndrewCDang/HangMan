const Keyboard = () =>  {
    // const currentGuessWord = useSelector(state => state.hangManGame.guessWord)

    // Creating array of all letters in qwerty arrangement
    const alphabetArray = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
    // Splitting arrays into seperate array rows
    const lettersRow1 = alphabetArray.slice(0,10);
    const lettersRow2 = alphabetArray.slice(10,19);
    const lettersRow3 = alphabetArray.slice(19,26);


    return(
        <div className="keyboard-parent">
            {/* List of key buttons created using map method for each row */}
            <div className="keyboard-container">
                {lettersRow1.map((char, index)=>{
                    return <div className="keyboard-item" key={index}>{char.toUpperCase()}</div>
                })}
            </div>
            <div className="keyboard-container">
                {lettersRow2.map((char, index)=>{
                    return <div className="keyboard-item" key={index}>{char.toUpperCase()}</div>
                })}
            </div>
            <div className="keyboard-container">
                {lettersRow3.map((char, index)=>{
                    return <div className="keyboard-item" key={index}>{char.toUpperCase()}</div>
                })}
            </div>
        </div>
    )
}

export default Keyboard;