const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Text Machine Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
            { text: "Home Text Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling?",
        answers: [
            { text: "HTML", correct: false },
            { text: "Python", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which language makes web pages interactive?",
        answers: [
            { text: "CSS", correct: false },
            { text: "HTML", correct: false },
            { text: "JavaScript", correct: true },
            { text: "SQL", correct: false }
        ]
    },
    {
    question: "Which company developed JavaScript?",
    answers: [
        { text: "Microsoft", correct: false },
        { text: "Netscape", correct: true },
        { text: "Google", correct: false },
        { text: "Apple", correct: false }
    ]
},

{
    question: "Which CSS property changes text color?",
    answers: [
        { text: "background", correct: false },
        { text: "font-color", correct: false },
        { text: "color", correct: true },
        { text: "text-style", correct: false }
    ]
}

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display = "none";

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();

    let message = "";

    if (score === questions.length) {
        message = "🏆 PERFECT SCORE! 🎉 Congratulations! You answered every question correctly!";
    }
    else if (score === questions.length - 1) {
        message = "👏 Excellent! You missed only one question. So close to perfection!";
    }
    else if (score === questions.length - 2) {
        message = "👍 Great job! You missed only two questions. Keep it up!";
    }
    else if (score >= Math.ceil(questions.length / 2)) {
        message = "😊 Good effort! You scored more than half of the questions correctly.";
    }
    else {
        message = "📚 Keep practicing! Review the topics and try again.";
    }

    questionElement.innerHTML =
        `${message}<br><br>Score: ${score}/${questions.length}`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();