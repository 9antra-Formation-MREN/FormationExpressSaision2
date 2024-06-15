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

    const car = new carModel({
      brand,
      model,
      year,
      owner: UserId,
    });

    await userModel.findByIdAndUpdate(UserId, {
      //car : car._id
      $push: { cars: car._id },
    });
    car.save();
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
