const mongoose = require("mongoose")
const medecin = require("./medecin.js");

const patient = require("./patient.js")
const rendSchema = mongoose.Schema({
  
    Daterd: { type: String , required: false },

    Descrd: { type: String, required: false },

    etatrend: {
        type: String,
        default: "pending",
        enum: [
          "pending",
          "open",
          "rejected",
          "cancelled",
          "completed",
          "accepted",
        ],
        required: true,
      },
medecinID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: medecin
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
module.exports = mongoose.model('rend', rendSchema)



