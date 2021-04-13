import Question from "./Question.js";

const questionExample = new Question(
    "What's 1 + 1?",
    [2,3,5,4],
    0
)


console.log(questionExample.isCorrect(0))