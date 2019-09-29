const path = require("path");
const router = require("express").Router();

const github = require("./controllerGitHub");

//  GitHub routes
router.route("/api/createUser")
  .post(github.createUser);

router.route("/api/findUsername")
  .post(github.findUsername);

router.route("/api/findEmail")
  .post(github.findEmail);

//  If no routes are hit, send the home page
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = router;