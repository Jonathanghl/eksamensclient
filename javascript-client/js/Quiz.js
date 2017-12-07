$(document).ready(() => {

  let courseId = SDK.Storage.load("courseId");

    SDK.User.loadNav();

    // i nedenstående kode printes alle bogtitler ud på den givne side.
    // Tilhørende html fil er Quiz.html

    const $chooseQuizButtons = $("#ChooseQuizButtons");


    SDK.Quiz.findAll(courseId, (err, quizs) => {

        quizs.forEach(quiz => {
            $chooseQuizButtons.append(` <button class = "btn-succes btn-block btn-lg" data-id=${quiz.quizId}>${quiz.quizTitle}</button>`);

            $(".btn-block").on('click', function (e) {
                let id = e.target.getAttribute('data-id')
                if (id !== undefined) {
                    SDK.Storage.persist('QuizId', id);
                    window.location.href = "Quiz.html";

                }
            })


        });

    });

});


