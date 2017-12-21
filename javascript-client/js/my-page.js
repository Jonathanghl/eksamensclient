$(document).ready(() => {

    /*Admin forside. Her kan administrator tilgå alle sine respektive funktioner*/

    SDK.User.loadNav();
    const currentUser = SDK.User.current();
    const $quizButtons = $("#QuizButtons")
    const $welcomeMessage = $("#welcome-message")
    const $deleteAdmin = $("#deleteMyAdminBtn")

    $welcomeMessage.html(`<h1>Velkommen, ${currentUser.username}  </h1>`);

    /*Printer fag ud og gør så man kan klikke sig videre fra dem, og hen til quizlister.
    * Dette gøres vha. courseId som vi gemmer i vores lokal storage*/

    SDK.Course.findAll((err, courses) => {
      if (err)  throw err;
      courses.forEach(course => {
        $quizButtons.append(` 
 <button class = "btn-succes btn-block btn-lg" data-id=${course.courseId}>${course.courseTitel}</button>`);
        $(".btn-block").on('click', function (e) {
          let id = e.target.getAttribute('data-id')
            if(id !== undefined) {
                SDK.Storage.persist('courseId', id);
                window.location.href = "adminWatchQuiz.html";

            }
          })

        });

      });

    /*Slet admin funktion. Fungerer ligesom slet bruger.
    * Tømmer til sidst local storage og sender dig til login side*/

    $deleteAdmin.append(`
    <button class= "btn btn-default" data-id=${currentUser.userId}> Slet bruger </button> `)

    $deleteAdmin.click((e)=>{
        let dltId = e.target.getAttribute('data-id')

        SDK.Storage.persist('deleteUserId', dltId);

        e.preventDefault();
        if (confirm("Er du sikker på du vil slette in bruger?") == true){
        SDK.User.delete(dltId, (err) => {
            if (err){
                window.alert("Der skete en fejl under sletningen")
            } else {
                window.alert("Brugeren blev slettet.")
                SDK.Storage.remove("QuestionId");
                SDK.Storage.remove("QuestionTitle");
                SDK.Storage.remove("QuizId");
                SDK.Storage.remove("courseId");
                SDK.Storage.remove("deleteUserId");
                SDK.Storage.remove("firstname");
                SDK.Storage.remove("lastname");
                SDK.Storage.remove("userType");
                SDK.Storage.remove("userId");
                SDK.Storage.remove("user");
                SDK.Storage.remove("watchQuizCourseId");
                window.location.href = "login.html";
            }
        })

    }
})

/*Alle disse clickhandlers herunder bruges til at oprette alle vores objekter.
* Jeg gør brug af modals for ui'et. Den første knap åbner modal'en. Den næste gemmer
* værdienre fra labels og oprettet objekter med dem.*/

    $("#createQuizBtn").click(() => {
        $("#createQuizModal").modal("toggle");
    });


    $("#finishCreateQuizBtn").click(()=> {

        const QuizTitle = $("#inputCreateQuizTitle").val();
        const CourseId = $("#inputCreateQuizCourseId").val();


        SDK.Quiz.create(QuizTitle,CourseId, (err, data) => {
            if (err){
                console.log("Det lykkedes ikke at oprette quizzen ")

            }
            else {
                alert("Quizzen blev oprettet!")
            }
        });

    });

    $("#createQuestionBtn").click(() => {
        $("#createQuestionModal").modal("toggle");
    });

    $("#finishCreateQuestionBtn").click(()=> {

        const QuestionTitle = $("#inputCreateQuestionTitle").val();
        const QuizId = $("#inputCreateQuestionQuizId").val();


        SDK.Question.create(QuestionTitle,QuizId, (err, data) => {
            if (err){
                console.log("Det lykkedes ikke at oprette spørgsmålet ")

            }
            else {
                alert("Spørgsmålet blev oprettet!")
            }
        });

    });

    $("#createChoiceBtn").click(() => {
        $("#createChoiceModal").modal("toggle");
    });

    $("#finishCreateChoiceBtn").click(()=> {

        const choiceTitle = $("#inputCreateChoiceTitle").val();
        const questionId = $("#inputCreateChoiceQuestionId").val();
        const answer = $("#inputCreateChoiceIsAnswer").val();


        SDK.Choice.create(choiceTitle,questionId, answer, (err, data) => {
            if (err){
                console.log("Det lykkedes ikke at oprette svarmuligheden ")

            }
            else {
                alert("Svarmuligheden blev oprettet!")
            }
        });

    });

    $("#watchUsersBtn").click(() => {
       window.location.href = "AdminWatchUsers.html";
    });

    $("#createAdminBtn").click(() => {
        $("#createAdminModal").modal("toggle");
    });

    $("#finishCreateAdminBtn").click(()=> {

        const username = $("#inputCreateAdminUsername").val();
        const password = $("#inputCreateAdminPassword").val();
        const firstname = $("#inputCreateAdminFirstname").val();
        const lastname = $("#inputCreateAdminLastname").val();

        SDK.User.createAdmin(username,password,firstname,lastname, (err, data) => {
            if (err){
                console.log("Det lykkedes ikke at oprette administratoren ")

            }
            else {
                alert("Administratoren blev oprettet!")
            }
        });

    });




});