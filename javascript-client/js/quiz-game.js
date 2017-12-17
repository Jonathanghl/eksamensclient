$(document).ready(() => {

    let quizId = SDK.Storage.load("QuizId");

    SDK.User.loadNav();

    const $QuizButtons = $("#QuizButtons");


    SDK.Question.find(quizId, (err, questions) => {

        questions.forEach(question => {$QuizButtons.append(` <button class = "btn-succes btn-block btn-lg" data-id=${question.questionId}>${question.questionTitle}</button>`);
        })


        $("#QuizButtons").on('click', function (e) {
            let Id = e.target.getAttribute('data-id')
            if(Id !== undefined){
                SDK.Storage.persist('QuestionId', Id);
            }
        });

});
});