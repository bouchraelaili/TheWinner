const express = require('express')
let Category = require('../models/category.model');
const router = express.Router();

// show all category 


router.get('/', (req, res) => {
  Category.find()
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error :" + err));
});


// add category

router.route("/add").post((req, res) => {
  const nom = req.body.nom;
  const question = req.body.question;
  const categoryPush = new Category({
    nom,question
  });
  categoryPush
    .save()
    .then(() => res.json("Category successfully added"))
    .catch((err) => res.status(400).json("Error :" + err));
});

//Deleting category
router.delete('/:id' , async (req, res) => {
  try {
    await Category.findById(req.params.id).remove()

     
      res.json({ message: 'Deleted Succesfully' })
  } catch (err) {
      res.status(500).json({ message: err.message })
      
  }


})


//updating category
router.patch('/:id' , getcategory , async (req, res) => {

  if (req.body.nom != null) {
    res.categories.nom = req.body.nom
    res.categories.question = req.body.question

}

  try {
    const updatedcategory = await res.categories.save()
    res.json(updatedcategory)

  } catch (err) {
      res.status(400).json({ message: err.message })
      
  }

})


async function getcategory(req, res, next) {

  let categories

  try {
      categories = await Category.findById(req.params.id)
      if (categories == null) {
          return res.status(404).json({ message: 'Cannot find category'})
      }
  } catch (err) {
      
      return res.status(500).json({ message: err.message })
  }

  res.categories = categories
  next()
}

module.exports = router;