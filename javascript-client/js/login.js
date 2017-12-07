$(document).ready(() => {

  SDK.User.loadNav();

    $("#createUserBtn").click(() => {
      console.log("Harro")
       $("#createUserModal").modal("toggle");
    });


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

  $("#login-button").click((e) => {
    e.preventDefault();

    const username = $("#inputUsername").val();
    const password = $("#inputPassword").val();

    SDK.User.login(username, password, (err, data) => {
      if (err && err.xhr.status === 401) {
        $(".form-group").addClass("has-error");
      }
      else if (err){
        console.log("BAd stuff happened")
      } else {
        alert("Du blev log'et ind.")
        window.location.href = "my-page.html";
      }
    });

  });

});