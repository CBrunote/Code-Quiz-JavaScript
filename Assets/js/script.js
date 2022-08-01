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
var highScores = [];

// question and answer bank
var questionIndex = 0
var questions = [
{
    question: "Commonly used data types DO NOT include",
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
            if (questions[questionIndex].answer !== this.textContent){
                (secondsLeft = secondsLeft - 15); 
            }
        questionIndex ++; 
            if (questionIndex >= questions.length) {
                endGame();
            } else if (secondsLeft <= 0) {
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
    if (secondsLeft < 0) {
        secondsLeft = 0
    }
    localStorage.setItem('score', JSON.stringify(secondsLeft));
    gameContainer.classList.add("hidden");
    endContainer.classList.remove("hidden");
    finalScore.textContent = localStorage.getItem("score")
}

// Click event for play buttoon on home screen to hide home screen and display quiz
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

// Go Home Button click event on Leaderboard Screen
document.querySelector("#goHome").onclick = function () {
    highscoreContainer.classList.add("hidden");
    homeContainer.classList.remove("hidden");
    clearHighscoresList();
}

// high scores button on home screen
document.querySelector("#highscore-btn").onclick = function (event) {
    event.preventDefault();
    homeContainer.classList.add("hidden");
    highscoreContainer.classList.remove("hidden");
    console.log(highScores);
    displayHighscores()
};

// Play again button on the end screen
document.querySelector("#playagain").onclick = function (event) {
    event.preventDefault();
    secondsLeft = 60;
    questionIndex = 0;
    endContainer.classList.add("hidden");
    homeContainer.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    showQuestion();
    setTime();
    progressText.textContent = (questionIndex + 1) + " of " + questions.length;
};

// Save button function. Saves the uusername and score to local storage and applies to the highscores array. Also adds text to confirm the score was saved.
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
    localStorage.setItem("highScores", JSON.stringify(highScores));

    var endText = document.querySelector("#end-text");
    endText.innerHTML = "SAVED!<br/><br/>Push View Highscores to see the Leaderboard";
};

//function to get highscores from local storage and add high scores as list items to the unordered list
function displayHighscores() {
        console.log(localStorage.getItem("highScores"));
        console.log(highScores);
        if (JSON.parse(localStorage.getItem("highScores")) === null){
            var li = document.createElement("li");
            li.className = "high-score";
            li.innerText = "No Highscores to Display"
            highscoresList.append(li);
        } else {
            highScores = JSON.parse(localStorage.getItem("highScores"));
            if (highScores.length >= 2) {
                highScores.sort((function (a, b) {
                return b.score - a.score;}))
            }
            for (var e = 0; e < highScores.length; e++) {
                var li = document.createElement("li");
                li.className = "high-score";
                li.innerText = highScores[e].username + " : " + highScores[e].score
                highscoresList.append(li);
            }
        }

};

//function to clear highscore list items so the clean highscores list is displayed every time the displayhighscores function runs
function clearHighscoresList() {
    document.getElementById("highscoresList").innerHTML = "";
};
