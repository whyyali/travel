const router = require("express").Router();
const countryController = require("../controllers/countryController");

router.post("/", countryController.addCountry)
router.get("/", countryController.getCountries)
router.get("/:id", countryController.getCountry)
router.post("/places", countryController.addPlacesToCountry)
router.put("/:id", countryController.updateCountry)
router.delete("/:id", countryController.deleteCountry)

module.exports = router;