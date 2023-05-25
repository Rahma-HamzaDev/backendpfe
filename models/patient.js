const mongoose = require("mongoose")
// const Medecin = require("./medecin.js");
const User = require("./user.js");

const patientSchema = mongoose.Schema({
    numfiche: { type: Number },
    cinPa: { type: Number },
    nompatient: { type: String },
    prenompatient: { type: String },
    adressepatient: { type: String },
    sexepatient: { type: String },

    emailpatient: { type: String },
    // password: { type: String },

    numtelPa: { type: Number },
    dateNais: { type: String },
    // profession: { type: String },

    HistoriqueFamilial: { type: String },
    HistoriqueSocial: { type: String },




    medecinID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },

}
    , { timesstamps: true }
)
module.exports = mongoose.model('patient', patientSchema)


