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
var secondsLeft = 60;
var finalScore = document.querySelector("#finalScore");
var timer;
var highScores = [JSON.parse(localStorage.getItem("userScores"))] || [];


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
            // console.log(userAnswer.textContent);
            // console.log(questions[questionIndex].answer === this.textContent)
            if (questions[questionIndex].answer !== this.textContent){
                (secondsLeft = secondsLeft - 15); 
            }
            //     this.classList.add("correct")
            // } else {
            //     this.classList.add("incorrect");
                
            // }
            questionIndex ++;
       
            if (questionIndex >= questions.length) {
                endGame();
            } else {  
            showQuestion();
            progressText.textContent = (questionIndex + 1) + " of " + questions.length;
            }
        }
    };
};

// Function to set timer at 60 seconds and count down each second
function setTime() {
        timer = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "0:" + secondsLeft;
        if (secondsLeft <= 0) {
          clearInterval(timer);
          endGame();
          ;
        }
        if (secondsLeft < 10) {
          timerEl.textContent = "0:0" + secondsLeft;
        }
      }, 1000);
  }

// Function to end the game
function endGame(){
    clearInterval(timer);
    localStorage.setItem('score', JSON.stringify(secondsLeft));
    gameContainer.classList.add("hidden");
    endContainer.classList.remove("hidden");
    finalScore.textContent = localStorage.getItem("score")
}

// Click event to hide home screen and display quiz
document.querySelector("#play").onclick = function () {
    secondsLeft = 60;
    questionIndex = 0;
    homeContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    showQuestion();
    setTime();
    progressText.textContent = (questionIndex + 1) + " of " + questions.length;
}

// View Highscoress button on end Screen
document.querySelector("#view-highscores").onclick = function (event) {
    event.preventDefault();
    endContainer.classList.add("hidden");
    homeContainer.classList.add("hidden");
    gameContainer.classList.add("hidden");
    highscoreContainer.classList.remove("hidden");
    displayHighscores()
};

// Highscore button on Home Screen
document.querySelector("#highscore-btn").onclick = function () {
    homeContainer.classList.add("hidden");
    highscoreContainer.classList.remove("hidden");
}

// Go Home Button click event on Leaderboard Screen
document.querySelector("#goHome").onclick = function () {
    highscoreContainer.classList.add("hidden");
    homeContainer.classList.remove("hidden");
    
}

//save button function
document.querySelector("#saveScoreBtn").onclick = function (event){
    event.preventDefault()
    var userName = document.getElementById("username").value;
    localStorage.setItem('username', userName);

    var score = localStorage.getItem("score");
    var userScores = {
        username: userName,
        score: score,
      };
    localStorage.setItem("userScores", JSON.stringify(userScores));
    
    
    highScores.push(userScores);
    
    if (localStorage.getItem("userScores")) {
        var localData = [JSON.parse(localStorage.getItem("userScores"))];
        console.log("inside Save Button")
        console.log(localData);
        localData.push(userScores);
        console.log(localData);
        localStorage.setItem("userScores", JSON.stringify(localData));
    }

 
      
    endContainer.classList.add("hidden");
    highscoreContainer.classList.remove("hidden");
};

function displayHighscores() {
    for (var e = 0; e < highScores.length; e++) {
        var li = document.createElement("li");
        var scores = li.innerText = highScores[e].username + " " + highScores[e].score
        highscoresList.append(li);
    }
};