import Question from "./Question.js";
import Quiz from './Quiz.js';


const App = (() => {
    // cache the DOM
    const quizEl = document.querySelector(".jabquiz");
    const quizQuestionEl = document.querySelector(".jabquiz__question");
    const trackerEl = document.querySelector(".jabquiz__tracker");
    const taglineEl = document.querySelector(".jabquiz__tagline");
    const choicesEl = document.querySelector(".jabquiz__choices");
    const progressInnerEl = document.querySelector(".progress__inner");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");


    const q1 = new Question(
        "First president of the U.S.A?",
        ["John","Paul","George","Ringo"],
        2)

    const q2 = new Question(
        "Which email service is owned by Microsoft?",
        ["Gmail","AOL","Telegram","hotmail"],
        3)

    const q3 = new Question(
        "What is the symbol for potassium?",
        ["A","K","X","P"],
        1)

    const q4 = new Question(
        "What animals are pearls found in?",
        ["Cat","Crab","Bird","Oysters"],
        4)

    const q5 = new Question(
        "Which country invented tea?",
        ["China","Japan","England","thailand"],
        0)


    const quiz = new Quiz([q1, q2, q3, q4, q5]);


    const setTextValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = _ => {
        const question = quiz.getCurrentQuestion().question;
        setTextValue(quizQuestionEl, question)
    }


    const renderChoiceElements = _ => {
        let markup = "";
        const currentChoices = quiz.getCurrentQuestion().choices;
        // console.log(currentChoices)
        currentChoices.forEach((elem, index) => {
            markup += `
            <li class="jabquiz__choice">
                <input type="radio" name="choice" class="jabquiz__input" id="choice${index}">
                <label for="choice${index}" class="jabquiz__label">
                <i></i>
                <span>${elem}</span>
                </label>
            </li>
            `
        });
        setTextValue(choicesEl, markup)
    }

    const renderTracker = _ => {
        const index = quiz.currentIndex;
        setTextValue(trackerEl, `${index + 1} of ${quiz.questions.length}`)

    }

    const getPercentage = (num1, num2) => {
        return Math.round(num1 / num2) * 100;
    }

    const launch = (width, maxPercent) => {
        let loadingBar = setInterval(function() {
            if(width > maxPercent) {
                clearInterval(loadingBar);
            } else {
                width++;
                progressInnerEl.style.width = `${width}%`;
            }
        }, 3)
    }



    const renderProgress = _ => {
        // 1. width
        const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length)
        // 2. launch(0%, width)
        launch(0,`${currentWidth}`);
    }




    const renderAll = _ => {
        if(quiz.hasEnded()) {
            // renderEndScreen
        } else {
           // 1. render the question
           renderQuestion();
           // 2. render the choices elements
           renderChoiceElements();
           // 3. render the tracker
           renderTracker()
           // 4. render the progress bar
           renderProgress()
        }
    }

    return {
        renderAll : renderAll
    }


})();

App.renderAll()