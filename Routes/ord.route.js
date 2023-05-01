const express = require('express');
const Ord = require('../models/ord');
const router = express.Router();
// // afficher la liste des consultation


router.get('/cons/:consId', async (req, res) => {
    try {
      const ordonnances = await Ord.find({ consID: req.params.consId }).populate("patientID").exec();
      res.status(200).json(ordonnances);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
});



router.get('/', async (req, res, )=> {
    try {
    const ord1 = await Ord.find().populate("consID").exec();
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
res.status(200).json(nouvord);
} catch (error) {
res.status(404).json({ message: error.message });
}
});


// // chercher un consultation
router.get('/:ordId',async(req, res)=>{
try {
const ord1 = await Ord.findById(req.params.consId).populate("consID").exec();
res.status(200).json(ord1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});



module.exports = router;








