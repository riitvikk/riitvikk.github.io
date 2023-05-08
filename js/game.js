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
        question: 'What is the accounting equation?',
        choice1: 'Assets = Liabilities + Equity',
        choice2: 'Liabilities = Assets + Equity',
        choice3: 'Equity = Assets + Liabilities',
        choice4: 'Revenues = Expenses + Net Income',
        answer: 1,
    },

    {
        question: ' Which of the following is an example of a current asset?',
        choice1: 'Land',
        choice2: 'Building',
        choice3: 'Inventory',
        choice4: 'Patent',
        answer: 3,
    },
    {
        question: 'Which of the following is an example of a current liability?',
        choice1: 'Mortage Payable',
        choice2: 'Accounts Receivable',
        choice3: 'Accounts Payable',
        choice4: 'Notes Payable',
        answer: 3,
    }, 
    {
        question: "What is the double-entry accounting system?",
        choice1: 'A system that records each transaction in only one account',
        choice2: 'A system that records each transaction in two accounts',
        choice3: 'A system that records each transaction in three accounts',
        choice4: 'A system that records each transaction in four accounts',
        answer: 2,
    }, 
    {
        question: "What is the difference between a debit and a credit in accounting?",
        choice1: 'A debit increases an asset account, and a credit decreases an asset account',
        choice2: 'A debit increases a liability account, and a credit decreases a liability account',
        choice3: 'A debit increases an expense account, and a credit decreases an expense account',
        choice4: 'A debit increases an account, and a credit decreases an opposite account'
        answer: 4,
    },
    {
        question: "What is the purpose of a trial balance in accounting?",
        choice1: 'To verify that the total debits equal the total credits',
        choice2: 'To verify that the total assets equal the total liabilities',
        choice3: 'To verify that the total expenses equal the total revenues',
        choice4: 'To verify that the total income equals the net income',
        answer: 1,
    },
    {
        question: "Which financial statement shows the revenue, expenses, and net income of a company for a specific period of time?",
        choice1: 'Balance sheet',
        choice2: 'Income statement',
        choice3: 'Statement of cash flows',
        choice4: 'Statement of changes in equity',
        answer: 2,
    },
    {
        question: "What is the purpose of adjusting entries in accounting?",
        choice1: 'To update the ledger accounts for unrecorded transactions',
        choice2: 'To update the financial statements for recorded transactions',
        choice3: 'To record transactions that occurred in a previous period',
        choice4: 'To close the temporary accounts at the end of the accounting period',
        answer: 2,
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





