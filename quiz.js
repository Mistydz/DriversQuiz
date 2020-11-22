// select all elements
const start = document.getElementById("start");
const udt = document.getElementById("udt");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/110.png",
        choiceA : "Stationnement interdit",
        choiceB : "Sens interdit",
        choiceC : "Limitation de vitesse",
        choiceD : "Aucune de ces réponses",
        correct : "C"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/tunnel.png",
        choiceA : "Chemin de fer",
        choiceB : "Entrée d’un tunnel",
        choiceC : "Rend point",
        choiceD : "Aucune de ces réponses",
        correct : "B"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/dépasser.png",
        choiceA : "Interdiction de dépasser",
        choiceB : "Double stationnement interdit",
        choiceC : "Stop",
        choiceD : "Aucune de ces réponses",
        correct : "A"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/rend.png",
        choiceA : "Cédez le passage",
        choiceB : "Interdiction de dépasser",
        choiceC : "Rend point",
        choiceD : "Aucune de ces réponses",
        correct : "C"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/demi-tour.png",
        choiceA : "Interdiction de faire demi-tour",
        choiceB : "Rend point",
        choiceC : "Stop",
        choiceD : "Aucune de ces réponses",
        correct : "A"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/interdictions.png",
        choiceA : "Stationnement interdit",
        choiceB : "Stationnement payant",
        choiceC : "Fin de toutes les interdictions",
        choiceD : "Aucune de ces réponses",
        correct : "C"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/vent.png",
        choiceA : "Obligation de tourner à gauche",
        choiceB : "Interdiction de dépasser",
        choiceC : "Obligation de faire demi-tour",
        choiceD : "Aucune de ces réponses",
        correct : "D"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/urgence.png",
        choiceA : "Stationnement interdit",
        choiceB : "Emplacement d'arrêt d'urgence",
        choiceC : "Sens interdit",
        choiceD : "Aucune de ces réponses",
        correct : "B"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/prioritaire.png",
        choiceA : "Chaînes à neige obligatoires",
        choiceB : "Fin prioritaire d'une route",
        choiceC : "Signalisation temporaire de travaux",
        choiceD : "Aucune de ces réponses",
        correct : "B"
    },{
        question : "Que signifie ce panneau?",
        imgSrc : "img/assets/exit.png",
        choiceA : "Passage pieton",
        choiceB : "Zone aeroportuaire",
        choiceC : "Sens interdit",
        choiceD : "Aucune de ces réponses",
        correct : "D"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    udt.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    // choose the image based on the scorePerCent
     let img = (scorePerCent >= 80) ? "img/5.png" :
            (scorePerCent >= 60) ? "img/4.png" :
            (scorePerCent >= 40) ? "img/3.png" :
            (scorePerCent >= 20) ? "img/2.png" :
            "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"% de vos réponses étaient correctes</p>";

    
    

}





















