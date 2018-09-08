var myQuestions = [
    {
        question: "What superhero protects Star City?",
        answers: {
            a: "The Flash",
            b: "Supergirl",
            c: "Green Arrow",
            d: "Green Lantern"
        },
        correctAnswer: "c"
    },

    {
        question: "In the Marvel universe, what realm does Thor call home?",
        answers: {
            a: "Midgard",
            b: "Asgard",
            c: "Jotunheim",
            d: "Valhalla"
        },
        correctAnswer: "b"
    },

    {
        question: "How did Spider-Man get his superpowers?",
        answers: {
            a: "Bit by a radioactive spider",
            b: "Caught in a particle accelerator explosion",
            c: "Bombarded by cosmic rays",
            d: "Born with them"
        },
        correctAnswer: "a"
    }
]


function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        var output = [];
        var answers;

        for(var i=0; i<questions.length; i++){

            answers = [];

            for(letter in questions[i].answers){

                answers.push(
                    '<label>'
                    + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                    + letter + ': '
                    + questions[i].answers[letter]
                + '</label>'
                );
            }

            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        quizContainer.innerHTML = output.join('');
    }

    function showResults(questions, quizContainer, resultsContainer){

        var answerContainers = quizContainer.querySelectorAll('.answers');

        var userAnswer = '';
        var numCorrect = 0;

        for (var i=0; i<questions.length; i++){

            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;

            if(userAnswer===questions[i].correctAnswer){
                numCorrect++;

                answerContainers[i].style.color = 'lightgreen';

            } else {
                answerContainers[i].style.color = 'red';
            }
        }

        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;

    }

    showQuestions(questions, quizContainer);

    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
        stop();
    }

    var timer = 30;

    var intervalId;
    
    function run(){
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }
    
    function decrement() {
        timer--;
        $("#time-left").html("<h2>Time left: " + timer + "</h2>");
    
        if (timer===0) {
            stop();
            alert("Time's up!")
            showResults(questions, quizContainer, resultsContainer)
        }
    }
    
    function stop() {
        clearInterval(intervalId)
    }
    
    run();
    

}

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton)


