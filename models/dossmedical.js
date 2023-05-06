const mongoose = require("mongoose")
const Medecin = require("./medecin.js");
const Patient = require("./patient.js");
const Cons = require("./cons.js");
const Ord = require("./ord.js");
const dossmedicalSchema = mongoose.Schema({
    
 patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Patient
},

consID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Cons 
},

ordID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Ord 
},
medecinID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Medecin
},

},

{
    timesstamps: true,
  }

)
module.exports = mongoose.model('dossmedical',dossmedicalSchema)



