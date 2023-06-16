const mongoose = require("mongoose");
// const User = require("./user.js");
const User = require("./user.js");



const disponibilitesSchema = mongoose.Schema({
    startTime: { type: String },

    endTime: { type: String },

    consultationTime: { type: String },

    joursdeTravail : { type: String } ,

    // medecinID: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: User
    // },
 
}
    , { timesstamps: true }
)
module.exports = mongoose.model('disponibilites', disponibilitesSchema)



