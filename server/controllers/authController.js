const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = async (req, res) => {
    const { email , password } = req.body;

    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ message:"The user already exists"});

    const hashed = await bcrypt.hash( password, 10 );
    const user = await User.create({ email, password: hashed });

    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET,{expiresIn: '1h'});
    res.json(token);
    
};

//login 

exports.login =async(req, res)=> {
    const {email, password}= req.body;

    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({message: "The user does not exist"});

    const match= await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({message: "Incorrect Password"})
    
    const token= jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET,{expiresIn: '1h'});
    res.json(token)
}