const mongoose = require('mongoose');
const Specialite = require("./specialite.js");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    
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
    datenais: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        enum: ["user", "admin", "doctor"],
        default: "user"
    },

    isActive: {
        type: Boolean,
        default: false,
        required: false
    },

    avatar: {
        type: String,
        required: false
    },
    certification:
     { type: String },

    specialiteID:
     { type: mongoose.Schema.Types.ObjectId, ref: Specialite },

    matricule: { 
        type: String },
        
},
    {
        timestamps: true,
    },
)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})
module.exports = mongoose.model('user', userSchema)