const userService = require("../services/userservice");
const {registerUserSchema, loginSchema} = require("../validations/authvalidation");
const {hashPassword, comparePasswords} = require("../utils/bcrypt");
const {generateOtp} = require("../utils/generateOtp");
const {sendOtpEmail, sendForgotPasswordEmail, sendLoginNotificationEmail} = require("../utils/emailserivce");

const authController = {

  register: async (req, res)=>{
        const {fullName, email, password, phoneNumber} = req.body;

        

        const result = registerUserSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.errors });
        }
        const existingUser = await userService.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        
        const hashed = await hashPassword(password);

        const { otp, otpExpiresAt } = await generateOtp();
        await sendOtpEmail(email, otp);

        const user = await userService.createUser({
            fullName,
            email: email,
            password: hashed,
            phoneNumber:phoneNumber,
            otp,
            otpExpiresAt,
        });


        if (!user) {
            return res.status(500).json({ message: "User registration failed" });
        }

        return res.status(201).json({ message: "User registered successfully", user });




  },

  verifyOtp: async (req, res) => {
    const { email, otp } = req.body;
    let user;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    if(email){
      const lowerCaseEmail = email.toLowerCase();
        user = await userService.getUserByEmail(lowerCaseEmail);

    }

    if (!user) {
      const users = await userService.getUserByOtp(otp);
      if (!users.length) {
        return res.status(404).json({ message: "User not found" });
      }

      user = findMostSimilarUser(users, otp);
    }

    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }



  }
}



module.exports = authController;