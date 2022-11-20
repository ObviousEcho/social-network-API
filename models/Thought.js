const { Schema, model } = require("mongoose");
const Reaction = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLenght: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    //   get: (v) => {},
    },
    username: {
      type: String,
      requred: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
