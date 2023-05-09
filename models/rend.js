const mongoose = require("mongoose")
const User = require("./user.js");

const Patient = require("./patient.js");

const rendSchema = mongoose.Schema({
  
    Daterd: { type: String , required: false },
    timerd: { type: String, required: false },
    Descrd: { type: String, required: false },
    etatrend: {
        type: String,
        default: "en attente",
        enum: [
          "en attente",
          "refuser",
          "cancel",
        //  "completer",
          "accepter",
        ],
        required: true,
      },
medecinID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
},
userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
}


},

{
    timesstamps: true,
  }

)
module.exports = mongoose.model('rend', rendSchema)



