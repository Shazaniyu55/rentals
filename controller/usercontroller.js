const userService = require("../services/userservice");
const {registerUserSchema, loginSchema} = require("../validations/authvalidation");
const {hashPassword, comparePasswords} = require("../utils/bcrypt");
const {generateOtp} = require("../utils/generateOtp");
const {sendOtpEmail, sendForgotPasswordEmail, sendLoginNotificationEmail} = require("../utils/emailserivce");
const STATUSCODES = require('../constant/statuscode');
const NotificationService = require("../services/notificationservice");




const authController = {

  register: async (req, res)=>{
        const {fullName, email, password, phoneNumber, userType} = req.body;

        

        const result = registerUserSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json(result);
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
            userType: userType
        });


        if (!user) {
            return res.status(500).json({ message: "User registration failed" });
        }else{

          //  res.status(200).json({
          //           status: "Success",
          //           message: "Login successful",
          //           token,
          //           user: {
          //               id: user._id,
          //               email: user.email,
          //               phoneNumber: user.phoneNumber,
                       

          //           }
          //       });
          //return res.redirect(`/otp?userId=${user._id}&email=${encodeURIComponent(user.email)}`)
          //return res.status(201).json({ message: "User registered successfully", user });
          res.render('otp', {user})

        }

        




  },

  verifyOtp: async (req, res) => {
    //const { email } = req.params;
     const { email, otp } = req.body;
    console.log(email, otp);
    let user;
    let proof = [];

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

      if (!user.otpExpiresAt || new Date() > user.otpExpiresAt) {
      return res.status(404).json({status: "failed", message:"OTP has expired."});
    }

    if (user.otp !== otp) {
      return res.status(404).json({status: "failed", message:"Invalid OTP."});
    }

    const updateOtp = await userService.updateUser(user._id, {
      otp: undefined,
      otpExpiresAt: undefined,
      isVerified: true,
    });

        const userResponse = {
      _id: user._id,
      phoneNumber: user.phoneNumber,
      email: user.email,
      otp: updateOtp.otp,
      otpExpiresAt: updateOtp.otpExpiresAt,
      isVerified: updateOtp.isVerified,
      joined_date: user.joined_date,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };


    if(user.userType === "House Owners"){
        res.render('house_owner_dash/dashboard',{user, proof})
        //console.log("welcome house owner")
    }else if(user.userType === "Users"){
      res.render('dashboard/dashboard', {user, proof})
      //console.log("welcome users")
    }else{
      console.log("falsify")
    }



  },

  login: async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(STATUSCODES.BAD_REQUEST).json({status:"failed", message:"email and password are required"})
    }

    const result =  loginSchema.safeParse(req.body);
    if(!result){
        res.status(STATUSCODES.INTERNAL_SERVER_ERROR).json({status:"failed", message: "internal server error"});

    }
    const user = userService.getUserByEmail(email);
    if(!user){
        res.status(STATUSCODES.INTERNAL_SERVER_ERROR).json({status:"failed", message:"user with this email does not exist"});

    }
    const isPasswordValid = await comparePasswords(password, user.password);
    if(!isPasswordValid){
        res.status(STATUSCODES.BAD_REQUEST).json({status:"failed", message:"invalid password"});

    }

    const userResponse = {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      phoneNumber: user.phoneNumber,
      email: lowerCaseEmail,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const token = jwtSign({
      _id: user._id,
      email: lowerCaseEmail,
    });

    await NotificationService.sendWebPushNotification(
      user._id,
      `Welcome Back, ${user.fullName}! 🎉`,
      `Hi ${user.fullName}, you've successfully logged in to your account. We're glad to have you back!`,
    );

    res.redirect('/dashboard');
    
  },

  getUserProfile: async (req, res) => {
    const userId = req.body;
    const user = await userService.getUserById(userId);


  },


 
}



module.exports = authController;