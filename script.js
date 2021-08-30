//QUIZ DEFAULT
const quizData = [{
        question: 'Which rock band was founded by Trent Reznor in 1988?',
        a: 'Stone Temple Pilots',
        b: 'Nirvana',
        c: 'Nine Inch Nails',
        d: 'A Perfect Circle',
        correct: 'c'
    },
    {
        question: 'In what year did The Clash release their iconic album London Calling?',
        a: '1981',
        b: '1979',
        c: '1972',
        d: '1985',
        correct: 'b'
    },
    {
        question: 'How many UK number ones did The Beatles have in total?',
        a: '17',
        b: '10',
        c: '8',
        d: '3',
        correct: 'a'
    },
    {
        question: 'Knights in White Satin was a 1967 hit for which band?',
        a: 'The Moody Blues',
        b: 'Jethro Tull',
        c: 'Yes',
        d: 'Camel',
        correct: 'a'
    },
    {
        question: 'Which music legend won the Nobel Prize for literature in 2016?',
        a: 'Paul Simon',
        b: 'Leonard Cohen',
        c: 'Joan Baez',
        d: 'Bob Dylan',
        correct: 'd'
    },
    {
        question: 'What was the name of the band formed by Jack Bruce, Eric Clapton, and Ginger Baker?',
        a: 'King Crimson',
        b: 'The Yardbirds',
        c: 'Cream',
        d: 'The Animals',
        correct: 'c'
    },
    {
        question: 'Roger Taylor is the drummer in which band?',
        a: 'Deep Purple',
        b: 'Rolling Stone',
        c: 'Kiss',
        d: 'Queen',
        correct: 'd'
    },
];

//GLOBAL VARIABLES
let currentQuiz = 0;
const questionEl = document.getElementById('question');
const message = document.getElementById('message');
const alert = document.getElementById('alert');
const questionHeader = document.getElementById('quiz-header');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const points = document.getElementById('points');
let point = 0;
let done = false;


//INIT
loadQuiz()


//LOAD QUESTION
function loadQuiz() {
    //RESET
    resetCheck();
    alert.style.display = 'none';
    message.style.display = 'none';

    //LOAD
    const currentQuizdata = quizData[currentQuiz];
    questionEl.innerHTML = currentQuizdata.question;
    a_text.innerHTML = currentQuizdata.a;
    b_text.innerHTML = currentQuizdata.b;
    c_text.innerHTML = currentQuizdata.c;
    d_text.innerHTML = currentQuizdata.d;
    points.textContent = `You have ${point}/${quizData.length} points`;
}

//GET THE USER ANSWERS
function getAnswer() {
    const answers = document.querySelectorAll('.answers');
    let answerUser = undefined;

    answers.forEach(answer => {
        if (answer.checked) {
            answerUser = answer.id;
        }
    });

    return answerUser;
}

//ON CLICK
submitBtn.addEventListener('click', () => {
    //NEXT QUESTION INDEX
    currentQuiz++;

    //GET ANSWER AND POINTS
    const answer = getAnswer();

    if (answer === quizData[currentQuiz - 1].correct) {
        point += 1;
    }

    if (answer && done === false) {

        //NEXT QUIZ
        if (currentQuiz < quizData.length) {
            loadQuiz();
            resetCheck();
        } else {
            getAnswer();

            if (point === quizData.length) {
                questionHeader.style.display = 'none';
                message.style.display = 'block';
                message.innerHTML = `
                <h2>Congrats!</h2>
                <p>You got all answer right! </p>
                `;
                submitBtn.textContent = 'Again!';
                done = true;
                point = 0;
                currentQuiz = 0;
            } else {
                questionHeader.style.display = 'none';
                message.style.display = 'block';
                message.innerHTML = `
                <h2>You finish!</h2>
                <p>You got ${point}/7 </p>
                `;
                submitBtn.textContent = 'Play again!';
                done = true;
                point = 0;
                currentQuiz = 0;
            }
        }
    } else {
        if (done) {
            currentQuiz = 0;
            done = false;
            point = 0;
            questionHeader.style.display = 'block';
            message.style.display = 'none';
            message.innerHTML = '';
            submitBtn.textContent = 'Next';
            loadQuiz();


        } else {
            alert.style.display = 'block';
            alert.innerHTML = 'You need insert a answer';

            setTimeout(() => {
                alert.style.display = 'none';
            }, 2000);

        }
    }
})

function resetCheck() {
    const checks = document.querySelectorAll('.answers');
    checks.forEach(checks => {
        if (checks.checked) {
            checks.checked = false;
        }
    });
}