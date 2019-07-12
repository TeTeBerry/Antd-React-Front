const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    ("/iot",
    proxy({
      target: "https://iotwatersystemserver.herokuapp.com",
      //   target: "http://localhost:8080",
      changeOrigin: true
    }))
  );
};
