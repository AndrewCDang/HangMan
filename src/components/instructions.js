

const Instructions = () => {
    return(
        <div className="instructions-container hidden">
            <div className="instr-top">
                <div></div>
                <div className="bold">How to Play</div>
                <div id="close-instr">x</div>
            </div>
            <div className="explaination">
                <p><strong>Guess the hidden word!</strong></p>
                <p>Each series of underlined dashes represents a letter of the hidden word.</p>
                <p>To suggest a letter, simply <strong>click on one of the on-screen keys</strong></p>
                <p>If the hidden word contains the suggested letter, the hidden letter(s) will be revealed above the appropriate stroke(s)</p>
                <p>If the hidden word does not contain the suggested letter, the player loses a life</p>
                <p>The game ends when the player successfuly reveals the hidden word or when they run out of lives.</p>
            </div>
        </div>
    )
}

export default Instructions;