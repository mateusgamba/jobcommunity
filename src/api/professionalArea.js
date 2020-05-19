const express = require("express");
const router = express.Router();
const professionalArea = require("../config/professionalArea.json");

// @route   GET api/professional-area
// @desc    Get professional area
// @access  Public
router.get("/", async (req, res) => {
  const professionalData = new Array();
  professionalArea.data.forEach((value) => {
    professionalData.push({
      label: value,
      value: value,
    });
  });
  res.json(professionalData);
});

module.exports = router;
