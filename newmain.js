//OX game using NodeJS with ECMAScript

'use strict'; //strict the variable

var prompt = require('prompt') //get prompt module from npm
const firstplayer = 'X'
const blueprintboard = () => {            //what is this thing??? quick function return?? 
    return { 0:'0', 1:'1', 2:'2',
             3:'3', 4:'4', 5:'5',
             6:'6', 7:'7', 8:'8',
 }
}

const winrule = [[0, 1, 2],[3, 4, 5], [6, 7, 8],
                 [0, 3, 6], [1, 4, 7], [2, 5, 8],
                 [0, 4, 8], [2, 4, 6]]

class OX {
    constructor () {
        this.currentplayer = firstplayer
        this.board = blueprintboard()
        this.turn = 0
        this.xscore = 0
        this.oscore = 0
        this.drawscore = 0
    }

    gameManage() {
        this.turn++
        this.printBoard()
        prompt.start()

        if (this.turn > 9) { 
            this.drawscore++
            this.printBoard()
            console.log('Draw!')
            this.printScore()
            this.rematch()
            return
        } else {
            console.log(`${this.currentplayer} Turn: `)
            prompt.get(['location'], (err, result) => {
                if (this.putToken(result.location) == false) { 
                    console.log(`You're not putting token in the right place, Try again ..`)
                    this.turn--
                    this.gameManage() 
                    return
                }
                
                if (this.checkWinner()) {
                    if (this.currentplayer === 'X') { this.xscore++ } else if (this.currentplayer === 'O') { this.oscore++ }
                    this.printBoard()
                    console.log(`${this.currentplayer} Win!`)
                    this.printScore()
                    this.rematch()
                    return
                }
                this.switchPlayer()
                this.gameManage()
            })
        }
    }

    printBoard() {
        console.log(`${this.board[0]} | ${this.board[1]} | ${this.board[2]}`)
        console.log(`${this.board[3]} | ${this.board[4]} | ${this.board[5]}`)
        console.log(`${this.board[6]} | ${this.board[7]} | ${this.board[8]}`)
    }

    putToken(location) {
        if (this.board[location] !== 'X' && this.board[location] !== 'O' && location < 9 ) {
            this.board[location] = this.currentplayer
            return true
        } else { return false }    
    }

    switchPlayer() {
        if (this.currentplayer === 'X') { this.currentplayer = 'O'} else { this.currentplayer = 'X' }
    }

    checkWinner() {
        for (let i = 0; i< winrule.length; i++) {
            let check = 0
            for (let j = 0; j< winrule[i].length; j++) {
                
                if (this.board[winrule[i][j]]  === this.currentplayer ) {
                    check++ 
                }
            }
            if (check == 3) {
                return true
            }
        }
        return false
    }

    printScore() {
        console.log(`X WIN : ${this.xscore} | O WIN : ${this.oscore} | DRAW : ${this.drawscore}`)
    }

    rematch() {
        console.log('Do you want a rematch? (Y/N)')
        prompt.get(['value'], (err, result) => {
            if ( result.value === 'Y') {
                this.board = blueprintboard()
                this.turn = 0
                this.gameManage()
            } else {
                return
            }
        })
    }
}

let game = new OX()
game.gameManage()

