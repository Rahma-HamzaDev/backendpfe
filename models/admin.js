const mongoose = require("mongoose")
const adminSchema = mongoose.Schema({
    nom: { type: String, required: false },
    prenom: { type: String, required: false },
    email: { type: String, required: true },
    password : { type: String, required: true },
  
    isAdmin: { type: Boolean, default: true },
    role: {
        type: String,
        enum: ["user", "admin","doctor"],
        default: "admin"
        },
        isActive: {
            type: Boolean,
               default: false,
               required: false
           },

})
module.exports = mongoose.model('admin', adminSchema)


