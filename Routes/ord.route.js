const express = require('express');
const Ord = require('../models/ord');
const router = express.Router();
// // afficher la liste des consultation


router.get('/cons/:consId', async (req, res) => {
    try {
      const ordonnance = await Ord.findOne({ consID: req.params.consId }).populate("consID").populate("patientID").exec();
      res.status(200).json(ordonnance);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
});



router.get('/', async (req, res, )=> {
    try {
    const ord1 = await Ord.find().populate("consID").populate("patientID").exec();
    res.status(200).json(ord1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
  
// créer un nouvel ordonnnance
router.post('/', async (req, res) => {
const nouvord = new Ord(req.body)
try {
await nouvord.save();
const ordonnance = await Ord.findOne({ consID: nouvord.consID }).populate("consID").populate("patientID").exec();
console.log(ordonnance)
res.status(200).json(ordonnance);
} catch (error) {
res.status(404).json({ message: error.message });
}
});


// // chercher un consultation
router.get('/:ordId',async(req, res)=>{
try {
const ord1 = await Ord.findById(req.params.ordId);
res.status(200).json(ord1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});



router.get('/:consId',async(req, res)=>{
  try {
  const ord1 = await Ord.findById(req.params.consId);
  res.status(200).json(ord1);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
  });


module.exports = router;








