const mongoose = require("mongoose")
const medecin = require("./medecin.js");
const patient = require("./patient.js");
const cons = require("./cons.js");


const ordSchema = mongoose.Schema({
    
    NumOrd: { type: Number },
    DateOrd: { type: String },
    // numfiche: { type: Number},
    NomMedicaments: { type: String},
    DosageMedicaments : { type: String },
    FréquanceMedicaments : { type: String  },
    FormeMedicaments: { type: String  },
    // NomPatient: { type: String  },
     observation: { type: String  },

 medecinID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: medecin
},

 patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: patient
},

consID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: cons 
}

},

{
    timesstamps: true,
  }

)
module.exports = mongoose.model('ord', ordSchema)



