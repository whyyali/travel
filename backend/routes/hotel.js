const router = require("express").Router();
const hotelController = require("../controllers/hotelController");

router.post("/", hotelController.addHotel)
router.get("/", hotelController.getHotels)
router.get("/:id", hotelController.getHotelById)
router.get("/byCountry/:id", hotelController.getHotelsByCountry)


module.exports = router;