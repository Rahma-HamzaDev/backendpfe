const express = require('express');
const Rend = require('../models/rend');
// const Medecin=require("../models/medecin")
// const patient=require("../models/patient")
const router = express.Router();



// afficher la liste des rendez-vous
router.get('/', async (req, res, )=> {
try {
const rends = await Rend.find().populate("medecinID").populate("patientID").exec();
res.status(200).json(rends);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

router.get('/patient/:patientId', async (req, res) => {
    try {
      const rendv = await Rend.find({ patientID: req.params.patientId }).populate("patientID").exec();
      res.status(200).json(rendv);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
});
// créer un nouvel rendez-vous
router.post('/', async (req, res) => {
const nouvrend = new Rend(req.body)
try {
await nouvrend.save();
res.status(200).json(nouvrend);
} catch (error) {
res.status(404).json({ message: error.message });
}
});




// router.post('/rendezvous', async (req, res, )=> {
// // const { newdate } = req.body;
// try {
//   const reserv = await new Rend({
//     Daterd: Daterd,
//     timerd:timerd,
//     Descrd:Descrd,
//     etatrd:etatrd,
//     Doctor: req.body.medecinID,
//     Patient: req.body.patientID,
//   }).save();
//   res.json(reserv);
// } catch (error) {
//   console.log(error);
//   return res.status(400).json({ error });
// }
// });



// chercher un rendez-vous
router.get('/:rendId',async(req, res)=>{
try {
const red = await Rend.findById(req.params.rendId);
res.status(200).json(red);
} catch (error) {
res.status(404).json({ message: error.message });
}
});


// modifier un rendez-vous
router.put('/:rendId', async (req, res)=> {
const {Daterd,timerd,Descrd,etatrd,medecinID,patientID} = req.body;
const id = req.params.rendId;
try {
const red = { 
    Daterd:Daterd,timerd:timerd,etatrd:etatrd,Descrd:Descrd,medecinID:medecinID,patientID:patientID, _id:id };
await Rend.findByIdAndUpdate(id, red);
res.json(Rend);
} catch (error) {
res.status(404).json({ message: error.message });
}
});


// Supprimer un rendez-vous
router.delete('/:rendId', async (req, res)=> {
const id = req.params.rendId;
await Rend.findByIdAndDelete(id);
res.json({ message: "rendez-vous deleted successfully." });
});


module.exports = router;








