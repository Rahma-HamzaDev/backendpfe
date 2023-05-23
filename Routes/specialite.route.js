const express = require('express');
const router = express.Router();
const specialite=require("../models/specialite")
const {uploadFile} =require("../middleware/uploadFile");

// afficher la liste des specialite 
router.get('/', async (req, res, )=> {
try {
const specialites = await specialite.find();
res.status(200).json(specialites);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// créer un nouvel specialites
router.post('/',uploadFile.single("Icon") ,async (req, res) => {
    const { nomsep,desc} = req.body;
const Icon=req.file.filename
const nouvspecialite = new specialite({nomsep:nomsep,Icon:Icon,desc:desc})
try {
await nouvspecialite.save();
res.status(200).json(nouvspecialite );
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// chercher un specialite
router.get('/:specialiteId',async(req, res)=>{
try {
const spe = await specialite.findById(req.params.specialiteId);
res.status(200).json(spe);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// modifier un specialite
router.put('/:specialiteId',async (req, res)=> {
const {nomsep , desc} = req.body;

const id = req.params.specialiteId;
try {
const spe1 = { 
nomsep:nomsep,desc:desc , _id:id };
await specialite.findByIdAndUpdate(id, spe1);
res.json(spe1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer un specialite
router.delete('/:specialiteId', async (req, res)=> {
const id = req.params.specialiteId;
await specialite.findByIdAndDelete(id);
res.json({ message: "specialite deleted successfully." });
});


module.exports = router;