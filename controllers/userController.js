const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    // User.find({}, (err, result) => {
    //   if (result) {
    //     res.status(200).json(result);
    //   } else {
    //     res.status(500).json({ message: "something went wrong" });
    //   }
    // });

    User.find().then(async (users) => {
      const userObj = {
        users,
      };
      return res.json(userObj);
    });
  },

  getSingleUser() {},

  createUser() {},

  updateUser() {},

  deleteUser() {},
};
