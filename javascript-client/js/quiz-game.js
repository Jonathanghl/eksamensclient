$(document).ready(() => {


    SDK.User.loadNav();


    const $Qtbody = $("#q-tbody");
    const $SendChoices = $("#sendChoices");
    const $quizName = $("#quizName")
    let quizId = SDK.Storage.load('QuizId');
    let totAnswers = 0;

    SDK.Question.find(quizId, (err, questions) => {
        if (err) throw err;

        questions.forEach(question => {
            getChoice(question.questionId);
            $Qtbody.append(` <br><h4>Spørgsmål ${totAnswers + 1}</h4> <h5 id=${question.questionId}>${question.questionTitle}
            <br></h5>
             `);

         totAnswers++;
        console.log(+totAnswers);
        });

    });



     function getChoice (qId) {
        SDK.Choice.findAll(qId, (err, choice) => {
            if (err) throw err;
            let liste = $("#"+qId);
            choice.forEach(choice => {

                liste.append(`
             <input type="radio" name=${qId} id=${choice.choiceId} value=${choice.answer}>${choice.choiceTitle} <br>
            
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