export const aboutController = {
    index: {
      handler: function (request, h) {
        console.log("aboutController index handler started")
        const viewData = {
          title: "About Hotels!",
        };
        console.log("aboutController index handler completed, returning")
        return h.view("about-view", viewData);
      },
    },
  };