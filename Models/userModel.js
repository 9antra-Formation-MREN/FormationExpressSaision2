const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    //name: { type : String , default : "azerty" , required : true , unique : true },
    age: Number,
    email: { type : String , unique : true},
    password: String,
    role: {
      type: String,
      enum: ["admin", "client", "Formateur"],
    },
    image_user: { type: String, required: false, default: "client.png" },
    ban : Boolean,
    
    cars : { type: mongoose.Schema.Types.ObjectId, ref: 'Car'}
  },
  { timestamps: true }
);

userSchema.post("save", async function (req, res, next) {
  console.log("new user was created & saved successfully");
  next();
});

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const User = this;
    User.password = await bcrypt.hash(User.password, salt);
    (User.CreatedAt = new Date()), (User.UpdatedAt = new Date()),
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      // if(user.etat === true && user.ban === false) {
      return user;
      // }
      // throw new Error('incorrect password')
    }
    throw new Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
