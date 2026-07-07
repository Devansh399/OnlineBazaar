const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');



// generating the token and then save it in local for a valid period.
const generateToken = (id)=>{
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
}


// Register a new user

const registerUser = async (req, res)=>{
      const {name, email, password} = req.body;
    try {
        
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        // if user is unique save him

        // Todo: Hash the password before saving to database

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        // Todo: Implement the JWT token generation for authentication

        // Todo: OTP sending and verficatoin for email conformation 

        // Todo: Sending welcome mail


        const user = await  User.create({name, email, password:hashPassword});     // creating the user after verfing it is unique
        
        if(user){
            // generating the otp if the user exist
            const otp = Math.floor(100000 + Math.random()*900000).toString();

            // now sending the mail

            const message = `Welcome to DigitalBajar, ${name}! Thankyou for registering with us. Your OTP for DigitalBajar registration is: ${otp}`

            await sendEmail(email, `Welcome to DigitalBajar - Your OTP for Registration is`, message)   // function for sending the mail.

            res.status(201).json({
               _id:user._id,
               name: user.name,
               email:user.email,
               role:user.role,
               token:generateToken(user._id)
            })
        }

        res.status(201).json({message: "User register successfully"});
    } catch (error) {
          res.status(500).json({message:"Server error"});       
    }
}



// login a user

const loginUser = async(req, res)=>{

    const {email, password} = req.body;
   
    try {
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            res.json(
                {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token:generateToken(user._id)
                }
            );

        }
        else{
            res.status(400).json({message:'Invalid email or password'})
        }
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }


}



// get all user

const getUsers = async(req, res)=>{
    try {
        const users = await User.find({}).select('-password');   //find all the user bs users ke passwords ko nhi lena hai.
        res.json(users)
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
};


module.exports={
    registerUser,
    loginUser,
    getUsers
};