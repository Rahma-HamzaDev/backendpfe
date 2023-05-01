const express = require('express');
const rend = require('../models/rend');
const router = express.Router();


// afficher la liste des rendez-vous
router.get('/', async (req, res, )=> {
try {
const rends = await rend.find().populate("medecinID","patientID").exec();
res.status(200).json(rends);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// créer un nouvel rendez-vous
router.post('/', async (req, res) => {
const nouvrend = new rend(req.body)
try {
await nouvrend.save();
res.status(200).json(nouvrend );
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// chercher un rendez-vous
router.get('/:rendId',async(req, res)=>{
try {
const red = await rend.findById(req.params.rendId);
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
await rend.findByIdAndUpdate(id, red);
res.json(rend);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer un rendez-vous
router.delete('/:rendId', async (req, res)=> {
const id = req.params.rendId;
await rend.findByIdAndDelete(id);
res.json({ message: "rendez-vous deleted successfully." });
});


module.exports = router;








