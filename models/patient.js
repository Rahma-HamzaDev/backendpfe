const mongoose = require("mongoose")

const patientSchema = mongoose.Schema({
    numfiche: { type: Number},
    cinPa: { type: Number},
    nompatient: { type: String },
    prenompatient: { type: String },
    adressepatient: { type: String },
    sexepatient: { type: String},

    email: { type: String},
    // password: { type: String },
    
    numtelPa: { type: Number },
    dateNais: { type: String},
    profession:{ type: String},


    
    isVerified: { type: Boolean },

    ispatient: { type: Boolean, default: true },

}
,{ timesstamps :true}
)
module.exports = mongoose.model('patient', patientSchema)


