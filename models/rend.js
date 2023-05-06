const mongoose = require("mongoose")
const User = require("./user.js");

const Patient = require("./patient.js");

const rendSchema = mongoose.Schema({
  
    Daterd: { type: String , required: false },
    timerd: { type: String, required: false },
    Descrd: { type: String, required: false },
    etatrend: {
        type: String,
        default: "pending",
        enum: [
          "pending",
          "refused",
          "cancelled",
          // "completed",
          "accepted",
        ],
        required: true,
      },
medecinID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
},
patientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Patient
}


},

{
    timesstamps: true,
  }

)
module.exports = mongoose.model('rend', rendSchema)



