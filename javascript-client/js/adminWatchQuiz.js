$(document).ready(() => {


    SDK.User.loadNav();


    const quizbody = $('#quiz-tbody');

    quizbody.html("");

    let quizId = SDK.Storage.load("courseId");
    SDK.Quiz.findAll(quizId, (err, quizs) => {

        quizs.forEach(quiz => {
            quizbody.append(` <tr><td>${quiz.quizId}</td><td>${quiz.quizTitle}</td><td>${quiz.courseId}</td></tr>`);

        });
    });


    $("#deleteQuizBtn").click(() => {
        $("#deleteQuizModal").modal("toggle");
    });

    $("#finishDeleteQuizBtn").click(()=> {

        const quizId = $("#inputDeleteQuizId").val();


        SDK.Quiz.delete(quizId, (err, data) => {
            if (err){
                console.log("Det lykkedes ikke at slette quizen ")

            }
            else {
                alert("Quizzen blev slette!")
            }
        });

    });

});



