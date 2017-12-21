$(document).ready(() => {

/*Tag quiz klasse*/

    SDK.User.loadNav();


    const $Qtbody = $("#q-tbody");
    const $SendChoices = $("#sendChoices");
    let quizId = SDK.Storage.load('QuizId');
    let totAnswers = 0;

    /*Her loades spørgsmål ind i siden, og for hvert spørgsmål bruges getChoice metoden til at appende
    * alle choices under*/


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

/*GetCHoice metoden der finder de rigtige choices vha questionId
og appender vores choices ift questions*/

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

    /*Clickhandler til vores tjek svar knap. Bruger variablene corAnswers og totAnswers til at oplyse brugerne om
    * antallet af korrekte og totale svar*/

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