const mongoose = require("mongoose");
const specialite = require("./specialite.js");
const bcrypt = require('bcrypt');
const medecinSchema = mongoose.Schema({
    nom: { type: String, required: false },
    numtel: { type: Number, required: false },
    adresse: { type: String, required: false },
    // sexemedecin: { type: String, required: false },
    photo: { type: String },
    email: { type: String, required: false },
    password: { type: String, required: false },

    verif: { type: String },



    Hospital: { type: String },
    diplômes: { type: String },
    certification: { type: String },
    cabinetname: { type: String },
    Experience: { type: String },
    ExpérienceProfessionnelle: { type: String },

    about: { type: String },

    specialiteID: { type: mongoose.Schema.Types.ObjectId, ref: specialite },


    ismedecin: { type: Boolean, default: true },

    isAdmin: { type: Boolean, default: false },

    // isverified: { type: Boolean, default: false },

    accountStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "cancelled", "accepted"],
        required: true,
    },

    role: {
        type: String,
        enum: ["doctor", "user", "admin"],
        default: "doctor"
    },
    isActive: {
        type: Boolean,
        default: false,
        required: false
    },


},
    {
        timesstamps: true
    },
)

medecinSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

const Medecin = mongoose.model('medecin', medecinSchema)
module.exports = Medecin

