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

        cb(null,data);
      });
    },
    create: (data, cb) => {
      SDK.request({
        method: "POST",
        url: "/quiz",
        data: data,

      }, cb);
    }
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
    findAll: (cb) => {
      SDK.request({method: "GET", url: "/choice"}, cb);
    }
  },
  Question: {
    create: (data, cb) => {
      SDK.request({
        method: "POST",
        url: "/question",
        data: data,
        headers: {authorization: SDK.Storage.load("tokenId")}
      }, cb);
    },
    findMine: (cb) => {
      SDK.request({
        method: "GET",
        url: "/orders/" + SDK.User.current().id + "/allorders",
        headers: {
          authorization: SDK.Storage.load("tokenId")
        }
      }, cb);
    }
  },
  User: {
    findAll: (cb) => {
      SDK.request({method: "GET", url: "/user"}, cb);
    },
    current: () => {
      return SDK.Storage.load("user");
    },
    logOut: () => {
      SDK.Storage.remove("userType");
      SDK.Storage.remove("user");
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

    loadNav: (cb) => {
      $("#nav-container").load("nav.html", () => {
        const currentUser = SDK.User.current();
        if (currentUser) {
          $(".navbar-right").html(`
            <li><a href="my-page.html">Dine fag</a></li>
            <li><a href="#" id="logout-link">Logout</a></li>
          `);
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