const express = require('express');
const router = express.Router();
const {uploadFile} =require("../middleware/uploadFile");
const Medecin=require("../models/medecin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const admin=require("../models/admin")
// afficher la liste des admin 
router.get('/', async (req, res, )=> {
try {
const admins = await admin.find();
res.status(200).json(admins);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// créer un nouvel admins
router.post('/', async (req, res) => {
const nouvadmin = new admin(req.body)
try {
await nouvadmin.save();
res.status(200).json(nouvadmin );
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// chercher un admin
router.get('/:adminId',async(req, res)=>{
try {
const pat = await admin.findById(req.params.adminId);
res.status(200).json(pat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// modifier un admin
router.put('/:adminId', async (req, res)=> {
const {nom,prenom,email,password} = req.body;

const id = req.params.adminId;
try {
const pat1 = { 
    nom:nom,prenom:prenom,email:email,password:password, _id:id };
await admin.findByIdAndUpdate(id, pat1);
res.json(pat1);
} catch (error) {
res.status(404).json({ message: error.message });
}
});
// Supprimer un admin
router.delete('/:adminId', async (req, res)=> {
const id = req.params.adminId;
await admin.findByIdAndDelete(id);
res.json({ message: "admin deleted successfully." });
});
//ajouter mon compte :
router.post('/register', async (req, res) => {
    try {
        let {nom,prenom,email,password} = req.body
        const admin = await admin.findOne({ email })
        if (admin) return res.status(404).send({
            success: false, message:
                "admin already exists"
        })
        const newUser = new admin({nom,prenom,email,password })
        const createdUser = await newUser.save()
        return res.status(201).send({ success: true, message: "Account admin created successfully", user: createdUser })
    } catch (err) {
        console.log(err)
        res.status(404).send({ success: false, message: err })
    }
});


module.exports = router;