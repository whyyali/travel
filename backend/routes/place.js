const router = require("express").Router();
const placeController = require("../controllers/placeController");

router.post("/", placeController.addPlaces)
router.get("/", placeController.getPlaces)
router.get("/:id", placeController.getPlace)
router.get("/byCountry/:id", placeController.getPlacesByCountry)


module.exports = router;