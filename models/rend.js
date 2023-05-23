const mongoose = require("mongoose")
const User = require("./user.js");

// const Patient = require("./patient.js");

const rendSchema = mongoose.Schema({
  
    Daterd: { type: String , required: false },
    timerd: { type: String, required: false },
    // Descrd: { type: String, required: false },
    etatrend: {
        type: String,
        enum: ["en attente","A rapporter","cancel","accepter" ,"contrôle"],
        // ,"completer"
        default: "en attente",
        required: true,
      },

      // optionrend: {
      //   type: String,
      //   enum: ["present ","Abscent","Annuler" ,"en cour"],
      //   default: "en cour",
       
      //   required: true,
      // },        
      //rend sur palce 
      firstName: {
        type: String,
        required: false,

    },
    lastName: {
        type: String,
        required: false,

    },
    phone: {
      type: String,
      required: false,
  },
  
  
  email: {
    type: String,
    required: false,
    // unique: true
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



