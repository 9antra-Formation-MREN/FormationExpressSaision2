var express = require('express');
var router = express.Router();
const carController = require("../Controllers/carController");

router.get("/getAllCars",carController.getAllCars)
router.get("/getCarById/:id",carController.getCarById)
router.post("/addCar",carController.addCar)
router.delete("/deleteCar",carController.deleteCar)


module.exports = router;
