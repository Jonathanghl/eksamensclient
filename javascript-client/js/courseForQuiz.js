$(document).ready(() => {
    const $deleteUser = $("#deleteMyUserBtn");
    const currentUser = SDK.User.current();
    const $welcomeUser = $("#welcomeUser")
    /*Velkomst side for normal bruger*/

    SDK.User.loadNav();

    $welcomeUser.html(`
    <h1>Velkommen, ${currentUser.username}</h1>`)
    /*Alle fag printes ud, så brugeren kan vælge hvilket fag han/hin vil quizzes i*/
    SDK.Course.findAll((err, courses) => {
        if (err) throw err;
        courses.forEach(course => {
            $("#courseQuizButtons").append(` 
 <button class = "btn-succes btn-block btn-lg" data-id=${course.courseId}>${course.courseTitel}</button>`);
            $(".btn-block").on('click', function (e) {
                let id = e.target.getAttribute('data-id')
                if (id !== undefined) {
                    SDK.Storage.persist('watchQuizCourseId', id);
                    window.location.href = "Quiz.html";

                }
            })

        });

    });

    /*Delete user knap, som fungerer på samme måde som delete admin
    * Laver en knap som indeholder brugerens id. Vi laver e SDK kald når der klikkes, og sletter med id'et
    * fra knappen*/
    $deleteUser.append(`
    <button class= "btn btn-default" data-id=${currentUser.userId}> Slet bruger </button> `)

    $deleteUser.click((e)=>{
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
})