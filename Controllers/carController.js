const carModel = require("../Models/carModel");
const userModel = require("../Models/userModel");

module.exports.getAllCars = async (req, res) => {
  try {
    const cars = await carModel.find();

    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.findById(id).populate("owner");

    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addCar = async (req, res) => {
  try {
    const { brand, model, year, UserId } = req.body;

    const user = await userModel.findById(UserId);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the user already has a car
    if (user.car) {
      throw new Error("User already has a car");
    }

    const car = new carModel({
      brand,
      model,
      year,
      owner: UserId,
    });

    await car.save(); // Save the car first to get its _id

    await userModel.findByIdAndUpdate(UserId, {
      cars: car._id
    }, { new: true }); // Update the user with the car's _id

    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.findByIdAndDelete(id);

    await userModel.updateMany({},{$pull : {cars : id}})


    res.status(200).json({ car });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
