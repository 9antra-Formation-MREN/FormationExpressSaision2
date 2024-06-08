const userModel = require("../Models/userModel"); 

module.exports.addUserC = async (req, res) => {
  const { name, age, email, password } = req.body;
  const role = "client";
  console.log(req.body);
  try {
    // const user = await userModel.create({
    //     name , age , email , password
    // })
    const user = new userModel({
      name,      age,      email,      password,      role,
    });
    const AddedUser = await user.save(); //

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteUser = async (req, res) => {
  try{
    const {id} = req.params;
    const checkIFUserExists = await userModel.findById(id); //false => undefined
    if (!checkIFUserExists)
      {
          throw new Error ("User not found !")
      }
    await userModel.findByIdAndDelete(id);
    res.status(200).json("deleted");
  }catch (err) {
    res.status(500).json({message: err.message});
  };
 }

 module.exports.updateUserC = async (req, res) => {
  try {
  const {id} = req.params;
  const { name, age, email, password } = req.body;
  const role = "client";
  const checkIFUserExists = await userModel.findById(id); //false => undefined
  if (!checkIFUserExists)
    {
        throw new Error ("User not found !")
    }
    //
   updated = await userModel.findByIdAndUpdate(
    id, {
      $set:{ name ,email, age , password}
    },
    {new : true}
   )

    res.status(201).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateUserPassword = async (req, res) => {
  try {
  const {id} = req.params;
  const { password } = req.body;
  const role = "client";
  const checkIFUserExists = await userModel.findById(id); //false => undefined
  if (!checkIFUserExists)
    {
        throw new Error ("User not found !")
    }
    //
   updated = await userModel.findByIdAndUpdate(
    id, {
      $set:{  password}
    },
    {new : true}
   )

    res.status(201).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserByID = async (req, res) => {
  try {
    const {id} = req.params;
    const users = await userModel.findById(id);
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


module.exports.addUser = async (req, res) => {
  const { name, age, email, password } = req.body;
  const { filename } = req.file;
  const role = "client";
  console.log(req.body);
  try {
    const user = new userModel({
      name,      age,      email,      password,      role, image_user : filename
    });
    const AddedUser = await user.save(); //

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
