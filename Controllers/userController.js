const userModel = require("../Models/userModel"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 2 * 60 * 60

const createToken = (id) => {
  return jwt.sign({id},process.env.Net_Secret, {expiresIn : maxAge})
}

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//eyJpZCI6IjY2Njc1YzE4YzY5NmNjNGZkMGZiMWJkNiIsImlhdCI6MTcxODEzNTk5MywiZXhwIjoxNzE4MTQzMTkzfQ
//.xH69EHUeSny3WZfkxWj9VjPdfQL1oTDYV0I1GzjmzhY

module.exports.addUserC = async (req, res) => {
  const { name, age, email, password } = req.body;
  const r = "client";
  console.log(req.body);
  try {
    // const user = await userModel.create({
    //     name , age , email , password
    // })
    const user = new userModel({
      name,      age,      email,      password,      role : r,
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
    //const {id} = req.session.user._id;
    const { name, age, email, password } = req.body;
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
    const salt = await bcrypt.genSalt();
    passwordHash = await bcrypt.hash(password, salt);
   updated = await userModel.findByIdAndUpdate(
    id, {
      $set:{  password : passwordHash}
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


module.exports.GetUserAuth = async (req, res) => {
  try {
    const id = req.session.user._id;
    const users = await userModel.findById(id);
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports.addwithImg = async (req, res) => {
  const {  email, password } = req.body;
  const { filename } = req.file;
  const role = "client";
  console.log(req.body);
  try {
    const user = new userModel({
      email,      password,      role, image_user : filename
    });
    const AddedUser = await user.save(); //-------

    res.status(201).json({ AddedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports.getOrderAllUsersByAge = async (req, res) => {
  try {
    const users = await userModel.find().sort({age : 1});
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsers18 = async (req, res) => {
  try {
    const users = await userModel.find({age : {$gt :18}});
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports.getUsers40 = async (req, res) => {
  try {
    const users = await userModel.find({age : {$lt :40}});
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsersByAge = async (req, res) => {
  try {
    //const age = req.params; ghalta
    //const {age} = req.params;
    const age = req.params.age;

    console.log(age)
    const ageInt = parseInt(age);
    const users = await userModel.find({age : {$lt :ageInt}}).sort({age : 1});
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports.getUserBetweenXAndY = async (req, res) => { //?minAge=18&maxAge=80
  try {

      //const {minAge,maxAge} = req.params
      const minAge = parseInt(req.query.minAge,10)
      const maxAge = parseInt(req.query.maxAge,10)
console.log(req.query)

    const users = await userModel.find({age : { $gt : minAge , $lt :maxAge }}).sort({age : 1});
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.searchUsersByName = async (req, res) => { //?minAge=18&maxAge=80
  try {

      //const name = req.query.name
      const {name} = req.query


    const users = await userModel.find({name : {$regex : "${name}$", $options : "i" }});
    if (users.length === 0 && !users) {
        throw new Error ("No users found");
    }
    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.login = async(req, res) => {
  try {
    const { email , password } = req.body
    const user = await userModel.login(email, password)
    
    //await userModel.findByIdAndUpdate({id: user._id},{statu : true});
    const token = createToken(user._id)
    console.log(token)

    res.cookie('this_is_jstoken', token,{httpOnly: false, maxAge: maxAge * 1000})
    res.status(200).json({user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports.logout = async (req, res) => { 
  try {
    //const id = req.session.user._id
    //await userModel.findByIdAndUpdate({id: user._id},{statu : true});

    res.cookie('this_is_jstoken', "",{httpOnly: false, maxAge: 1})
    res.status(200).json("logout");
    
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}