$(document).ready(() => {


    SDK.User.loadNav();

/*En side hvor administratoren kan se alle quizer i systemet.
    * Disse appendes og ligges ind i en tabel. Der udover er der en modal til at slette quiz.
    * Man indtaster blot ID, på den quiz man vil slette i modal'ens label.*/


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



