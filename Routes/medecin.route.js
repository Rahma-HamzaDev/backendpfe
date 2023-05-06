const express = require('express');
const router = express.Router();
const {uploadFile} =require("../middleware/uploadFile");
const Medecin=require("../models/medecin")
const User=require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//     service: 'gmail',

//     auth: {
//         user: 'esps421@gmail.com',
//         pass: 'lnrqjuzysshlrpem'
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// })

// afficher la liste des medecin 
router.get('/', async (req, res, )=> {
try {
const medecins = await Medecin.find().populate("specialiteID").exec();
res.status(200).json(medecins);
} catch (error) {
res.status(404).json({ message: error.message });
}
});


    

// chercher un medecin by id
// router.get('/:medecinId',async(req, res)=>{
// try {
// const med = await Medecin.findById(req.params.medecinId);
// res.status(200).json(med);
// } catch (error) {
// res.status(404).json({ message: error.message });
// }
// });

// modifier un medecin
// router.put('/:medecinId', async (req, res)=> {
// const {nom,email,adresse,diplômes,certification,cabinetname,Hospital,photo,numtel,Experience,about,ExpérienceProfessionnelle,password,specialiteID} = req.body;
// const id = req.params.medecinId;
// try {
// const med1 = { 
//     nom:nom,email:email,adresse:adresse,Hospital:Hospital,photo:photo,diplômes:diplômes,certification:certification,cabinetname:cabinetname,Experience:Experience,ExpérienceProfessionnelle:ExpérienceProfessionnelle,about:about,numtel:numtel,password:password,specialiteID:specialiteID, _id:id };
// await Medecin.findByIdAndUpdate(id, med1);
// res.json(med1);
// } catch (error) {
// res.status(404).json({ message: error.message });
// }
// });
// // Supprimer un medecin
// router.delete('/:medecinId', async (req, res)=> {
// const id = req.params.medecinId;
// await Medecin.findByIdAndDelete(id);
// res.json({ message: "medecin deleted successfully." });
// });

//edit medecin
// router.get('/status/edit/', async (req, res) => {
//     try {

//         let email = req.query.email
//         console.log(email)
//         let user = await Medecin.findOne({ email })
//         user.isActive = !user.isActive
//         user.save()
//         res.status(200).send({ success: true ,user})
//     } catch (err) {
//         return res.status(404).send({ success: false, message: err })
//     }
// })





//ajouter medecins
// créer un nouvelle medecin
    // router.post('/', async (req, res) => {

    //     const nouvmedecin = new Medecin(req.body)
    //     try {
    //         await nouvmedecin.save();
    //         res.status(200).json(nouvmedecin);
    //     } catch (error) {
    //         res.status(404).json({ message: error.message });
    //     }
    // });

// router.get('/doctorlogout', (req, res) => {
//         req.session.destroy();
//         res.status(200).json({ message: 'Logout successful' });
       
//       });


module.exports = router;


















// var express = require('express');
// const medecin = require('../models/medecin');
// var router = express.Router();
// // afficher la liste des medecin.

// router.get('/', async (req, res, )=> {
//     try {
//     const medecins = await medecin.find();
//     res.status(200).json(medecins);
//     } catch (error) {
//     res.status(404).json({ message: error.message });
//     }
//     });

// // chercher une medecin
// router.get('/:medecinId',async(req, res)=>{
//     try {
//         const med = await medecin.findById(req.params.medecinId);
//         res.status(200).json(med);
//         } catch (error) {
//         res.status(404).json({ message: error.message });
//         }
// });
// // modifier une medecin
// router.put('/:medecinId', async (req, res)=> {
// });
// // Supprimer une medecin
// router.delete('/:medecinId', async (req, res)=> {
// });
// module.exports = router;