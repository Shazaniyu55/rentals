const User = require("../model/usermodel");
const {Document} = require("mongoose");


const userService = {
    async createUser(data) {
        const user = new User(data);
        return await user.save();
      },

      async getUserByEmail(email) {
        return await User.findOne({ email });
      },
      async checkOtpExists(otp) {
        const user = await User.findOne({ otp });
        return !!user;
      },

      async search(){

      },

      
}



module.exports = userService;