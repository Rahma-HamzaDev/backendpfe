const express = require('express');
const router = express.Router();

const patient=require("../models/patient")
// afficher la liste des patient 
router.get('/', async (req, res, )=> {
try {
const patients = await patient.find();
res.status(200).json(patients);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// créer un nouvel patients
router.post('/', async (req, res) => {
const nouvpatient = new patient(req.body)
try {
await nouvpatient.save();
res.status(200).json(nouvpatient );
} catch (error) {
res.status(404).json({ message: error.message });
}
});

// chercher un patient
router.get('/:patientId',async(req, res)=>{
try {
const pat = await patient.findById(req.params.patientId);
res.status(200).json(pat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// modifier un patient
router.put('/:patientId', async (req, res)=> {
const {numfiche,cinPa,nompatient,prenompatient,email,adressepatient,sexepatient,password,numtelPa,profession ,dateNais} = req.body;

const id = req.params.patientId;
try {
const pat1 = { 
    cinPa:cinPa,nompatient:nompatient,numfiche:numfiche,prenompatient:prenompatient,profession:profession,email:email,adressepatient:adressepatient,sexepatient:sexepatient,password:password,numtelPa:numtelPa,dateNais:dateNais, _id:id };
await patient.findByIdAndUpdate(id, pat1);
res.json(pat1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer un patient
router.delete('/:patientId', async (req, res)=> {
const id = req.params.patientId;
await patient.findByIdAndDelete(id);
res.json({ message: "patient deleted successfully." });
});


module.exports = router;