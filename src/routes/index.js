const express = require("express");
const { sendMailer } = require("../services/emailer");
const router = express.Router();

/* GET home page. */
router.post("/sender", (req, res) => {
  const { emailFrom, emailTo, name, message } = req.body;
  return sendMailer(emailFrom, emailTo, name, message)
    .then((successMessage) =>
      res.send({ success: true, message: `Email enviado: ${successMessage}` })
    )
    .catch((errorMessage) => {
      res.status(500).send({
        success: false,
        message: `Email não enviado: ${errorMessage}`,
      });
    });
});

module.exports = router;
