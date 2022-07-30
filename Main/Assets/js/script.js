var question = document.querySelector("#question");
var choiceA = document.querySelector("#a");
var choiceB = document.querySelector("#b");
var choiceC = document.querySelector("#c");
var choiceD = document.querySelector("#d");
var choiceArr = [choiceA, choiceB, choiceC, choiceD]
var scoreText = document.querySelector("#score");
var homeContainer  = document.querySelector("#home");
var gameContainer = document.querySelector("#game");
var endContainer = document.querySelector("#end");
var highscoreContainer = document.querySelector("#highScores");
var timerEl = document.querySelector("#timerEl");
var progressText = document.querySelector("#progressText");
var userAnswer = document.querySelector(".choice-text");
var highscoresList = document.querySelector("#highscoresList");
var highScores = json.parse(localStorage.getItem("highScores")) || [];


var questionIndex = 0
var questions = [
{
    question: "Commonly used data types DO NOT inlcude",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},
{
    question: "The condition of an If/Else statement is enclosed with ______.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
},
{
    question: "Arrays in Javascript can be used to store ______.",
    choices: ["numbers and strings", "other strings", "booleans", "all of the above"],
    answer: "all of the above"
},
{
    question: "String values must be enclosed within _____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes"
},
{
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal/bash", "for loops","console.log"],
    answer: "console.log"
}
]

// function to display question and choices on game and change to next question when an answer is chosen
function showQuestion() {
    question.textContent = questions[questionIndex].question;
    for (var i = 0; i < choiceArr.length; i++) {
        choiceArr[i].textContent = questions[questionIndex].choices[i];
        choiceArr[i].onclick = function() { 
            // console.log(questions[questionIndex].choices[i] === questions.answer);
            // if (questions[questionIndex].choices[i] == questions.answer) {
            //     choiceArr[i].dataset.isAnswer = true
            // } else {
            //     choiceArr[i].dataset.isAnswer = false
            // }
            console.log(this.textContent);
            // console.log(choiceArr[i].dataset.isAnswer);
            questionIndex ++;
            if (questionIndex >= questions.length) {
                endGame();
            } else {
            showQuestion();
            progressText.textContent = (questionIndex + 1) + " of " + questions.length;
            }
        };
    }
}

//comparison function for correct or incorrect answer
// function comparison() {
//     console.log(userAnswer.getAttribute("data-answer"));
//     if (userAnswer.getAttribute("data-answer") === questions.answer){
//         userAnswer.classList.add("correct");
//     }else {
//         userAnswer.classList.add("incorrect");
//     }
//     };


// Function to set timer at 60 seconds and count down each second
function setTime() {
    var secondsLeft = 60;
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timerEl.textContent = "0:" + secondsLeft;
      if (secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        endGame();
        ;
      } if (secondsLeft < 10) {
        timerEl.textContent = "0:0" + secondsLeft;
      }
    }, 1000);
  }


function endGame(){
    gameContainer.classList.add("hidden");
    endContainer.classList.remove("hidden");
}

// click event to hide home screen and display quiz
// document.querySelector(".btn").onclick = function () {
//     homeContainer.classList.add("hidden");
//     gameContainer.classList.remove("hidden");
//     showQuestion();
//     setTime();
//     progressText.textContent = (questionIndex + 1) + " of " + questions.length;
// }