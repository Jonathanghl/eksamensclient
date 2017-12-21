$(document).ready(() => {

  SDK.User.loadNav();

  /*Knap til at åbne modal, som skal bruges til at oprette bruger*/
    $("#createUserBtn").click(() => {
       $("#createUserModal").modal("toggle");
    });

/*Her oprettes brugeren. Når der trykkes gemmes værdier fra labels, og de
* bruges til at kalde optret medtoden fra SDK'en*/
    $("#finishCreateUserBtn").click(()=> {

    const username = $("#inputCreateUserUsername").val();
    const password = $("#inputCreateUserPassword").val();
    const firstname = $("#inputCreateUserFirstname").val();
    const lastname = $("#inputCreateUserLastname").val();

    SDK.User.create(username,password,firstname,lastname, (err, data) => {
      if (err){
        console.log("Det lykkedes ikke at oprette brugeren ")

      }
      else {
        alert("Brugeren blev oprettet!")
      }
        });

    });

    /* Login knap. tjekker om de to værdier fra labels
    * stemmer overens med noget i databasen vha. serveren. Kalder login metode fra SDK
    * og sender værdierne med.*/

  $("#login-button").click((e) => {
    e.preventDefault();

    const username = $("#inputUsername").val();
    const password = $("#inputPassword").val();

    SDK.User.login(username, password, (err, data) => {
      if (err && err.xhr.status === 401) {
        $(".form-group").addClass("has-error");
      }
      else if (err){
        window.alert("Forkert brugernavn eller kodeord")
      } else {
        if (SDK.Storage.load('userType') == 2) {
        window.location.href = "my-page.html";
      }
      else
      { window.location.href = "courseForQuiz.html";
      }}
    });

  })

});
