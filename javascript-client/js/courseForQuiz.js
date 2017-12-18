$(document).ready(() => {

    SDK.User.loadNav();


    SDK.Course.findAll((err, courses) => {
        if (err) throw err;
        courses.forEach(course => {
            $("#courseQuizButtons").append(` 
 <button class = "btn-succes btn-block btn-lg" data-id=${course.courseId}>${course.courseTitel}</button>`);
            $(".btn-block").on('click', function (e) {
                let id = e.target.getAttribute('data-id')
                if (id !== undefined) {
                    SDK.Storage.persist('watchQuizCourseId', id);
                    window.location.href = "adminWatchQuiz.html";

                }
            })

        });

    });
})