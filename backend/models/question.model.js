const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const question = new Schema(
  {
    Phquestion: {
      type: String,
      required: true,
      trim: true,
      minlenght:10,
    }
    
  },
  {
    versionKey: false
}
);

const questionList = mongoose.model("question", question);
module.exports = questionList;
