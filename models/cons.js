const mongoose = require("mongoose")
const patient = require("./patient.js");
 const user = require("./user.js");

const consSchema = mongoose.Schema({

    NumCons: { type: Number },
    DateCons: { type: String },
    // numfiche: { type: Number},
    MotifCons: { type: String },
    AntécedentsMédecaux: { type: String },
    HistoriqueFamilial: { type: String },
    ExemansComplementaires: { type: String },
    HistoriqueSocial: { type: String },
    //
    TaillePatient: { type: String },
    PoisPatient: { type: String },
    tension: { type: Number },
    Température: { type: String },
    // Périmètre : { type: String  },
    DescriptionExamen: { type: String },

    medecinID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user
    },
    

    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: patient
    }


},

    {
        timesstamps: true,
    }

)
module.exports = mongoose.model('cons', consSchema)



