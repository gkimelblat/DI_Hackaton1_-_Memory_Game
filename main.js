/* The constant "cardBoard" is a "document.querySelector", which have the function of returning a STATIC NodeList 
representing a list (array) of documments that match the designated selectors.
The constant "images" is the array containing all the images to be called by the constant "cardBoard".
*/
const cardBoard = document.querySelector('#cardboard');
const images = [
    '00_fool.jpg',
    '01_magician.jpg',
    '02_priestess.jpg',
    '03_empress.jpg',
    '04_emperor.jpg',
    '05_hierophant.jpg',
    '06_love.jpg',
    '07_chariot.jpg',
    '08_strength.jpg',
];
/* The variable cardHTML creates the div class 'memory_card', which refers to 'data-card' as the Data Set of images in the folder 'img'; 
the img classes for frontFace and backFace, which allows to control both sides of the cards with the designated images.
The "forEach loop with the arrow function" loops through the array of images, being the new variable "img" the index of each card
on the "images" array.
*/
let cardHTML = '';

let player1 = prompt('Please insert the name of the Player 1');
let player2 = prompt('Please insert the name of the Player 2');
let p1Score = 0
let p2Score = 0
let p1Display = document.getElementById('p1').innerHTML = player1 + ' ' + p1Score
let p2Display = document.getElementById('p2').innerHTML = player2 + ' ' + p2Score

images.forEach(img => {
    cardHTML += `
    <div class='memory_card' data-card='${img}'>
        <img class='frontFace' src='img/${img}'>
        <img class='backFace' src='img/cardBack.jpg'>
    </div>
    `
});
// This will make each card be rendered twice, so we can have matching cards.
cardBoard.innerHTML = cardHTML + cardHTML;
// End of HTML RENDER

/* The constant 'cards' have a 'querySelectorAll' for the div class 'memory_card' that returns a static NodeList 
of the elements of the div class specified, so we can have our matching cards. 
The variables 'firstCard' and 'secondCard' represent the first clicked card and the second clicked card.
The boolean variable lockCard ensures that only two cards can be active at a time, so when the user opens the first card it will stay open,
and when the user opens the second card, the fuction 'checkForMatch' will check if they are correct.
The function 'flipCard' switches the div class to make our cards flip sides.
If the cards are correct, both will stay open, and the fucntion 'resetCards' will remove them from the list of the clickable cards.
If they are not a match, the function 'disableCards' wil let them open for a 1000ms (1 second) and then close both.
The function 'playerSwitch' will check who's turn is based on the name color (Blue is who's playing). 
If the cards match, the player keeps it's turn, otherwise, the colors of names are switched, switching the turns.
The funcion 'playerScore' also check's the color of the player's name to give point's if the player gets matching cards.
Both 'playerSwitch' and 'playerScore' are nested in the function 'resetCards', as 'resetCards' will check if the cards are a Match or not.
thus also checking if the player gets a point through 'playerScore' or if the turns switch through 'playerSwitch'.
 */

const cards = document.querySelectorAll('.memory_card');
let firstCard, secondCard;
let lockCard = false;
let p1Color = document.getElementById('p1').style.color = 'blue'
let p2Color = document.getElementById('p2').style.color = 'blueviolet'

function flipCard(){
    if (lockCard) return false;
    this.classList.add('flip');

    if(!firstCard){
        firstCard = this;
        
        return false;
    } 
        
    secondCard = this;

    checkForMatch();
}


function checkForMatch(){
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    !isMatch ? disableCards() : resetCards(isMatch);
}

function playerScore() {
} 


function disableCards(){
    lockCard = true;
    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards();
    }, 1000);
}

(function shuffle(){
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * images.length);
        card.style.order = rand;
    });
})();

function resetCards(isMatch = false){
    if(isMatch){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        playerScore();
        gameOver();
    } else {
        playerSwitch();
    }
    [firstCard, secondCard, lockCard] = [null, null, false];

    function playerSwitch() {
        if(p1Color == 'blue') {
            p1Color = document.getElementById('p1').style.color = 'blueviolet';
            p2Color = document.getElementById('p2').style.color = 'blue';
        } else {
            p1Color = document.getElementById('p1').style.color = 'blue';
            p2Color = document.getElementById('p2').style.color = 'blueviolet';
        }
    }

    function playerScore() {
        if(p1Color == 'blue') {
            p1Score = parseInt(p1Score + 1);
            p1Display = document.getElementById('p1').innerHTML = player1 + ' ' + p1Score;
        } else {
            p2Score = parseInt(p2Score + 1);
            p2Display = document.getElementById('p2').innerHTML = player2 + ' ' + p2Score;
        }
    }

    function gameOver() {
        if (parseInt(p1Score + p2Score) == 9) {
            if(p1Color == 'blue') {
                alert(`Congratulations! ${player1} wins!`);
                location.reload();
            } else {
                alert(`Congratulations! ${player2} wins!`);
                location.reload();
            }
        }
    }
}



cards.forEach(card => card.addEventListener('click', flipCard));