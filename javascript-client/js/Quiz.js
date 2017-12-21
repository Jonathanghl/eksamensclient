$(document).ready(() => {

  let courseId = SDK.Storage.load("watchQuizCourseId");

    SDK.User.loadNav();
/*Dette er siden hvor man vælger Quiz.
* Denne quiz' id bruges herefter til at sende dig videre
* til selve quizzen.*/


    const $chooseQuizButtons = $("#ChooseQuizButtons");


    SDK.Quiz.findAll(courseId, (err, quizs) => {

        quizs.forEach(quiz => {
            $chooseQuizButtons.append(` <button class = "btn-succes btn-block btn-lg" data-id=${quiz.quizId}>${quiz.quizTitle}</button>`);

            $(".btn-block").on('click', function (e) {
                let id = e.target.getAttribute('data-id')
                if (id !== undefined) {
                    SDK.Storage.persist('QuizId', id);
                    window.location.href = "quiz-game.html";

                }
            })


        });

    });


});


