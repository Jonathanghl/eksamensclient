$(document).ready(() => {

    SDK.User.loadNav();

    const body = $('#usertbody');

    /*En side hvor administratoren kan se alle brugere i systemet.
    * Disse appendes og ligges ind i en tabel*/

    body.html("");
    SDK.User.findAll((err, users) => {
        users.forEach((user) => {
            body.append(` <tr><td>${user.userId}</td><td>${user.username}</td><td>${user.firstName}</td><td>${user.lastName}</td></tr>`);

});
    });
});



