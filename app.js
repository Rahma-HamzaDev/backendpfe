//ideal 
const express = require('express');
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const cors = require('cors')
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/'));
app.use(cors())

const medecinRouter = require("./Routes/medecin.route");
const patientRouter = require("./Routes/patient.route")
const specialiteRouter = require("./Routes/specialite.route");
const rendRouter = require("./Routes/rend.route");
const userRouter = require("./Routes/user.route");
const adminRouter = require("./Routes/admin.route");
const consRouter = require("./Routes/cons.route");
const ordRouter = require("./Routes/ord.route");

dotenv.config()


//BodyParser Middleware


mongoose.set("strictQuery", false);
// Connexion à la base données
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexion à la base de données réussie");
    }).catch(err => {
        console.log('Impossible de se connecter à la base de données', err);
        process.exit();
    });
app.get("/", (req, res) => {
    res.send("hi rahma");
});
app.use('/api/medecins', medecinRouter);
app.use('/api/patients', patientRouter);
app.use('/api/specialites', specialiteRouter);
app.use('/api/rends', rendRouter);
app.use('/api/users', userRouter);
app.use('/api/cons', consRouter);
app.use('/api/ord', ordRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

//
