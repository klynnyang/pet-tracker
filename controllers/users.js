const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 6;

module.exports = {
  create,
  login,
  verify,
  show,
  update
};

async function show(req, res) {
  try {
      let user = await UserModel.findById(req.params.userid).populate("post").exec()
      res.status(200).json(user)
  }catch(err){
      res.status(400).json(error)
  }
}


async function update(req, res) {
  console.log(req.params)
  try {
      let user = await UserModel.findById(req.params.userid).exec()
      await user.update({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        postalCode: req.body.postalCode
      })
      console.log(user)
      res.status(200).json("Success!")
  }catch(err){
      res.status(400).json(error)
  }
}



async function create(req, res) {
  console.log(req.body)
  try {
    
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    console.log(hashedPassword)
    
    const user = await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      postalCode: req.body.postalCode,
    });
    console.log("user", user)
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    console.log(token);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  console.log(req.body)
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log(user)
    if (!(await bcrypt.compare(req.body.password, user.password)))
      throw new Error();
    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
    res.status(200).json(token);
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

function verify(req, res) {
  //if the middleware hits next then you know the token is valid
  //Check the Auth in the config folder to see the data flow
  res.json(req.user);
}
