const express = require("express");
const { convertHeicFromUrl } = require("../controllers/convertFromUrl");
const router = express.Router();

router.get("/convert", convertHeicFromUrl);

module.exports = router;
