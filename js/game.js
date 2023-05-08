const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions= [];

let questions = [
    {
        question: 'Which of the following is the correct way of declaring an array?',
        choice1: 'int javatpoint[10];',
        choice2: 'int javatpoint;',
        choice3: 'javatpoint{20};',
        choice4: 'array javatpoint[10];',
        answer: 1,
    },

    {
        question: ' Which of the following is the advantage of the array data structure?',
        choice1: 'Elements of mixed data types can be stored.',
        choice2: 'Easier to access the elements in an array',
        choice3: 'Index of the first element starts from 1.',
        choice4: 'Elements of an array cannot be sorted',
        answer: 2,
    },
    {
        question: 'Which data structure is mainly used for implementing the recursive algorithm?',
        choice1: 'Queue',
        choice2: 'Stack',
        choice3: 'Binary tree',
        choice4: 'Linked list',
        answer: 2,
    }, 
    {
        question: "Which of the following highly uses the concept of an array?",
        choice1: 'Binary Search tree',
        choice2: 'Caching',
        choice3: 'Spatial locality',
        choice4: 'Scheduling of Processes',
        answer: 3,
    },
]


const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0
    score= 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply =  selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        
        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();

        }, 1000)
    })
})

incrementScore = num => {
    score+=num
    scoreText.innerText = score
}

startGame()





