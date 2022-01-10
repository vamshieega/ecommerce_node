

const router = require("express").Router();

//Create
router.get("/", async (req, res) => {
  try {
     res.status(200).json('Working');
  } catch (err) {}
});
 module.exports = router;
