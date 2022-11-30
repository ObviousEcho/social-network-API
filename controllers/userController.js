const { Thought, User } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find().then(async (users) => {
      const userObj = {
        users,
      };
      return res.json(userObj);
    });
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that id" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id! " })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete user and associated thoughts:

  // deleteUser(req, res) {
  //   User.findOne({ _id: req.params.userId })
  //     .select("-__v")
  //     .then((result) => {
  //       const userName = result.username;
  //       User.findOneAndRemove({ _id: req.params.userId })
  //         .then(async (user) =>
  //           !user
  //             ? res.status(404).json({ message: "No such user exists" })
  //             : await Thought.deleteMany({username: userName})
  //         )
  //         .then(() => res.json({ message: "User Successfully deleted" }));
  //     })

  //     .catch((err) => {
  //       res.status(500).json(err);
  //     });
  // },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: "No user found with that id" })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No friend with that id found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
