export const aboutController = {
    index: {
      handler: function (request, h) {
        console.log("aboutController index handler started")
        const loggedInUser = request.auth.credentials;
        console.log(loggedInUser);
        const viewData = {
          title: "About Hotels!",
        };
        if (loggedInUser.email === process.env.ADMIN_EMAIL) {
          viewData.admin = true;
        }
        console.log("aboutController index handler completed, returning")
        return h.view("about-view", viewData);
      },
    },
  };