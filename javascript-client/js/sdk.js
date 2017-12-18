const SDK = {
  serverURL: "http://localhost:8080/api",
  request: (options, cb) => {

    let headers = {};
    if (options.headers) {
      Object.keys(options.headers).forEach((h) => {
        headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
      });
    }

    $.ajax({
      url: SDK.serverURL + options.url,
      method: options.method,
      headers: headers,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(options.data),
      success: (data, status, xhr) => {
        cb(null, data, status, xhr);
      },
      error: (xhr, status, errorThrown) => {
        cb({xhr: xhr, status: status, error: errorThrown});
      }
    });

  },
  Quiz: {

      findAll: (id, cb) => {
          SDK.request({
              method: "GET",
              url: "/quiz/" + id,

          }, (err, data) => {
              if (err) return cb(err);

              data = JSON.parse(data);

              cb(null, data);
          });
      },
      create: (quizTitle, courseId, cb) => {
          SDK.request({
              method: "POST",
              url: "/quiz",
              data: {

                  quizTitle: quizTitle,
                  courseId: courseId

              },

          }, (err, data) => {

              if (err) return cb(err);

              cb(null, data);

          });
      },

      delete: (id, cb) => {
          SDK.request({
                  method: "DELETE",
                  url: "/quiz/" + id,

              },
              (err) => {

                  if (err) return cb(err);
                  cb(null);

              });
      },
  },





    Question: {
        create: (questionTitle, quizId, cb) => {
            SDK.request({
                method: "POST",
                url: "/question",
                data: {
                    quizId: quizId,
                    questionTitle: questionTitle


                },

            }, (err, data) => {

                if (err) return cb(err);

                cb(null, data);

            });
        },

        find: (id, cb) => {
            SDK.request({
                method: "GET",
                url: "/question/" + id,

            }, (err, data) => {
                if (err) return cb(err);

                data = JSON.parse(data);

                cb(null, data);
            });
        },

    },


  Course: {
    findAll: (cb) => {
        SDK.request({
            method: "GET",
            url: "/courses"

        }, (err, data) => {
            if (err) return cb(err);

            data = JSON.parse(data);
            cb(null, data);
        });
    }

    },




  Choice: {

      create: (choiceTitle, questionId, answer, cb) => {
          SDK.request({
              method: "POST",
              url: "/choice",
              data: {
                  questionId: questionId,
                  choiceTitle: choiceTitle,
                  answer: answer


              },

          }, (err, data) => {

              if (err) return cb(err);

              cb(null, data);

          });
      },
      findAll: (id, cb) => {
          SDK.request({
              method: "GET",
              url: "/choice/" + id,

          }, (err, data) => {
              if (err) return cb(err);

              data = JSON.parse(data);

              cb(null, data);
          });
      },
  },


  User: {
    delete: (id, cb) => {
          SDK.request({
                  method: "DELETE",
                  url: "/user/" + id,

              },
              (err) => {

                  if (err) return cb(err);
                  cb(null);

              });
      },

    findAll: (cb) => {
      SDK.request({method: "GET", url: "/user"}, cb);
    },

    current: () => {
      return {
            username: SDK.Storage.load("user"),

                userId: SDK.Storage.load("userId"),

                firstName: SDK.Storage.load("firstname"),

                lastName: SDK.Storage.load("lastname"),

                type: SDK.Storage.load("userType")

        }



    },
    logOut: () => {
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
      window.location.href = "index.html";
    },
    login: (username, password, cb) => {
      SDK.request({
          url: "/user/login",
          method: "POST",
          data: {

          username: username,
          password: password
        },

      }, (err, data) => {

        //On login-error
        if (err) return cb(err);

        data = JSON.parse(data);
        SDK.Storage.persist("userType", data.type);
        SDK.Storage.persist("user", data.username);
        SDK.Storage.persist("userId", data.userId),
            SDK.Storage.persist("firstname", data.firstName),
            SDK.Storage.persist("lastname", data.lastName),

        cb(null, data);

      });
    },
      create: (username, password, firstname, lastname, cb) => {
          SDK.request({
              url: "/user",
              method: "POST",
              data: {

                  username: username,
                  password: password,
                  firstName: firstname,
                  lastName: lastname,
                  type: 1
              },

          }, (err, data) => {

              if (err) return cb(err);

              cb(null, data);

          });
      },

      createAdmin: (username, password, firstname, lastname, cb) => {
          SDK.request({
              url: "/user",
              method: "POST",
              data: {

                  username: username,
                  password: password,
                  firstName: firstname,
                  lastName: lastname,
                  type: 2
              },

          }, (err, data) => {

              if (err) return cb(err);

              cb(null, data);

          });
      },

    loadNav: (cb) => {
      $("#nav-container").load("nav.html", () => {
        const currentUser = SDK.User.current();
        if (currentUser.userId !== null) {
          $(".navbar-right").html(`
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
          $(".navbar-left").append(`
            <li><a href="my-page.html">Dine fag</a></li>`);
        } else {
          $(".navbar-right").html(`
            <li><a href="login.html">Log-in <span class="sr-only">(current)</span></a></li>
          `);
        }
        $("#logout-link").click(() => SDK.User.logOut());
        cb && cb();
      });
    }
  },


  Storage: {
    prefix: "ExamQuizSDK",
    persist: (key, value) => {
      window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load: (key) => {
      const val = window.localStorage.getItem(SDK.Storage.prefix + key);
      try {
        return JSON.parse(val);
      }
      catch (e) {
        return val;
      }
    },
    remove: (key) => {
      window.localStorage.removeItem(SDK.Storage.prefix + key);
    }
  }
};