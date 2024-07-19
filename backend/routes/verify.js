const router = require("express").Router();
const verifyController = require("../controllers/verifyController");

router.post("/send", verifyController.sendCode);
router.post("/receive", verifyController.receivedCode);

module.exports = router;