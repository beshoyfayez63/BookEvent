const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
  createUser: async ({ userInput }) => {
    const existedUser = await User.findOne({ email: userInput.email });
    if (existedUser) {
      throw new Error('User exist already');
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      password: hashedPassword,
    });
    await user.save();
    return { ...user._doc, password: null };
  },
};
