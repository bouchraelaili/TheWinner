const express = require('express')
let question = require('../models/question.model');
const router = express.Router();

// show all question 


router.get('/', (req, res) => {
  question.find()
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json("Error :" + err));
});


// add question

router.route("/add").post((req, res) => {
  const Phquestion = req.body.Phquestion;
  const questionPush = new question({
    Phquestion
  });
  questionPush
    .save()
    .then(() => res.json("question successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//Deleting question
router.delete('/:id' , async (req, res) => {
  try {
    await question.findById(req.params.id).remove()

     
      res.json({ message: 'Deleted Succesfully' })
  } catch (err) {
      res.status(500).json({ message: err.message })
      
  }


})


//updating question
router.patch('/:id' , getquestion , async (req, res) => {

  if (req.body.Phquestion != null) {
    res.questions.Phquestion = req.body.Phquestion
  

}

  try {
    const updatedquestion = await res.questions.save()
    res.json(updatedquestion)

  } catch (err) {
      res.status(400).json({ message: err.message })
      
  }

})


async function getquestion(req, res, next) {

  let questions

  try {
    questions = await question.findById(req.params.id)
      if (questions == null) {
          return res.status(404).json({ message: 'Cannot find question'})
      }
  } catch (err) {
      
      return res.status(500).json({ message: err.message })
  }

  res.questions = questions
  next()
}

module.exports = router;