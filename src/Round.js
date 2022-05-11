const Turn = require("./Turn");

class Round {
    constructor(deck) {
        this.deck = deck;
        this.turns = 0;
        this.incorrectGuesses = [];
    };
    returnCurrentCard() {
        return this.deck.cards[0];
    };
    takeTurn(answer){
        const turn = new Turn(answer, this.returnCurrentCard())
        this.turns++;
        if (!turn.evaluateGuess()) {
            this.incorrectGuesses.push(this.deck.cards.shift().id);
        } else {
            this.deck.cards.shift();
        }
        return turn.giveFeedback()
    }
    calculatePercentage() {
        if (this.incorrectGuesses.length === 0){
            return 100;
        } else {
            return this.incorrectGuesses.length / this.turns * 100
        }
    }
    endRound(){
        const message = `** Round over! ** You answered ${this.calculatePercentage()}% of the questions correctly!`
        console.log(message);
        return message;
    }
}

module.exports = Round;

