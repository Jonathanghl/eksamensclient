$(document).ready(() => {

    SDK.User.loadNav();
    const currentUser = SDK.User.current();
    const $quizButtons = $("#QuizButtons")
    const $welcomeMessage = $("#welcome-message")





    SDK.Course.findAll((err, courses) => {
      if (err)  throw err;
      courses.forEach(course => {
        $quizButtons.append(` 
 <button class = "btn-succes btn-block btn-lg" data-id=${course.courseId}>${course.courseTitel}</button>`);
        $(".btn-block").on('click', function (e) {
          let id = e.target.getAttribute('data-id')
            if(id !== undefined) {
                SDK.Storage.persist('courseId', id);
                window.location.href = "Quiz.html";

            }
          })

        });

      });



    $welcomeMessage.html(`<h1>Velkommen, ${currentUser.username}  </h1>`);




});