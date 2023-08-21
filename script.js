const questions = [
    {
        question: "O que é dilatação superficial?",
        answers: [
            { text: "A expansão de um objeto em todas as direções.", correct: false },
            { text: "A variação na densidade de um objeto.", correct: false },
            { text: "O aumento no volume de um objeto.", correct: false },
            { text: "O aumento da área de um objeto.", correct: true },
        ]
    },
    {           
        question: "Qual é o fator principal que contribui para a dilatação superficial dos materiais?",
        answers: [
            { text: "Massa do material.", correct: false },
            { text: "Temperatura do ambiente.", correct: true },
            { text: "Comprimento do material.", correct: false },
            { text: "Força aplicada.", correct: false },
        ]
    },
    {           
        question: "Quando um material sofre dilatação superficial devido ao aumento de temperatura, o que acontece com as partículas no material?",
        answers: [
            { text: "Elas diminuem sua vibração.", correct: false },
            { text: "Elas se contraem.", correct: false },
            { text: "Elas se afastam umas das outras.", correct: true },
            { text: "Elas aumentam sua massa.", correct: false },
        ]
    },
    {           
        question: "Qual é a equação correta que relaciona a variação da área superficial (ΔS) de um objeto à sua área inicial (S0), ao coeficiente de dilatação superficial (β) e à variação de temperatura (ΔT)?",
        answers: [
            { text: "ΔS = S0 * β * ΔT", correct: true },
            { text: "ΔS = S0 / β * ΔT", correct: false },
            { text: "ΔS = S0 + β * ΔT", correct: false },
            { text: "ΔS = S0 - β * ΔT", correct: false },
        ]
    },
    {           
        question: "Quais unidades são usadas para medir o coeficiente de dilatação superficial?",
        answers: [
            { text: "°C", correct: false },
            { text: "m/s", correct: false },
            { text: " N/m²", correct: false },
            { text: "°C^-1", correct: true },
        ]
    },
    {           
        question: "O que é o coeficiente de dilatação superficial de um material?",
        answers: [
            { text: "A taxa de mudança de densidade com a temperatura.", correct: false },
            { text: "A taxa de variação de área com a pressão.", correct: false },
            { text: "A taxa de variação de volume com a temperatura.", correct: false },
            { text: "A taxa de variação de área com a temperatura.", correct: true },
        ]
    },
    {           
        question: "Qual é o nome dado ao processo reversível de resfriar um material para retorná-lo à sua forma original após ter sofrido dilatação térmica?",
        answers: [
            { text: "Reversão térmica", correct: false },
            { text: "Contração térmica", correct: true },
            { text: "Compressão térmica", correct: false },
            { text: "Retração térmica", correct: false },
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn"); 
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
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
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Você pontuou ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Tente novamente"
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





nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
