const mongoose = require("mongoose");
// const User =require("./user.js");
const Specialite = require("./specialite.js");

const bcrypt = require('bcrypt');
const medecinSchema = mongoose.Schema({
    // user:User,
    firstName: {
        type: String,
        required: false,

    },
    lastName: {
        type: String,
        required: false,

    },
    adresse:
     { type: String,
       required: false 
        },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false,
    },


    isActive: {
        type: Boolean,
        default: true,
        required: false
    },

    avatar: {
        type: String,
        required: false
    },

    certification:
     { 
        type: String 
    },

    matricule: { 
        type: String 
    },

    specialiteID: {
         type: mongoose.Schema.Types.ObjectId,
         ref: Specialite 
        },

    




    isDoctor: { 
        type: Boolean, 
        default: true },


    // isverified: { type: Boolean, default: false },

    accountStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "cancelled", "accepted"],
        required: true,
    },

    role: {
        type: String,
        default: "doctor"
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

