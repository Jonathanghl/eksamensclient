$(document).ready(() => {


    SDK.User.loadNav();


    const $Qtbody = $("#q-tbody");
    const $SendChoices = $("#sendChoices");
    let quizId = SDK.Storage.load('watchQuizCourseId');
    let totAnswers = 0;

    SDK.Question.find(quizId, (err, questions) => {
        if (err) throw err;

        questions.forEach(question => {
            getChoice(question.questionId);
            $Qtbody.append(`<form id=${question.questionId}>${question.questionTitle}
            <br>
            </form> `);

         totAnswers++;
        console.log(+totAnswers);
        });

    });



     function getChoice (id) {
        SDK.Choice.findAll(id, (err, choice) => {
            if (err) throw err;
            let list = $("#"+id);
            choice.forEach(choice => {

                list.append(`
             <input type="radio" name=${id} id=${choice.choiceId} value=${choice.answer}>${choice.choiceTitle}
            
            `);
            });
        });
    }

$SendChoices.click((e) => {
         e.preventDefault();
    let check = document.getElementById("q-tbody").getElementsByTagName("input");
    let corAnswers = 0;

    for(let e = 0; e < check.length; e++) {
        if (check[e].checked && check[e].value == 1) {
            corAnswers++;}
    }
    window.alert("Du har "+corAnswers+" rigtige svar, ud af " +totAnswers);
});


});