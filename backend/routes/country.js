const router = require("express").Router();
const countryController = require("../controllers/countryController");

router.post("/", countryController.addCountry)
router.get("/", countryController.getCountries)
router.get("/:id", countryController.getCountry)
router.post("/places", countryController.addPlacesToCountry)

module.exports = router;