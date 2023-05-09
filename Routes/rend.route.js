const express = require('express');
const Rend = require('../models/rend');
const router = express.Router();
const User = require('../models/user');

const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',

  auth: {
      user: 'esps421@gmail.com',
      pass: 'lnrqjuzysshlrpem'
  },
  tls: {
      rejectUnauthorized: false
  }
})


// afficher la liste des rendez-vous
router.get('/', async (req, res, )=> {
try {
const rends = await Rend.find().populate("medecinID").populate("userID").exec();
res.status(200).json(rends);
} catch (error) {
res.status(404).json({ message: error.message });
}
});


//afficher rendezvous patient  (historique rendez vous de maladie patientID : user.id connecter )
router.get('/user/:userId', async (req, res) => {
  try {
    const rendP = await Rend.find({ userID: req.params.userId }).populate("userID").populate("medecinID").exec();
    res.status(200).json(rendP);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
  });


  // créer un nouvel rendez-vous en tant que user (maladie) id medecin (medecinID,userID)
// router.post('/', async (req, res) => {
//   const nouvrend = new Rend(req.body)
//   try {
//   await nouvrend.save();
//   //verification par mail

//      // Envoyer l'e-mail de confirmation de l'inscription
//   //    var mailOption = {
//   //     from: '"verify your email " <esps421@gmail.com>',
//   //     to: User.email,
//   //     subject: 'vérification your email ',
//   //     html: `<h2>${nouvrend.Daterd}! date de votre RendezVous</h2>
//   // <h4>please verify your email to procced.. </h4>
//   // <a href="http://${req.headers.host}/api/rends/status/edit?email=${nouvrend.etatrend}">click here</a>`
//   // }
//   // transporter.sendMail(mailOption, function (error, info) {
//   //     if (error) {
//   //         console.log(error)
//   //     }
//   //     else {
//   //         console.log('verification email sent to your gmail account ')
//   //     }
//   // })
//   //
//   res.status(200).json(nouvrend);
//   } catch (error) {
//   res.status(404).json({ message: error.message });
//   }
//   });


//nex rend




//changer etat de rendez vous de user
  router.get('/status/edit/', async (req, res) => {
    try {

        let email = req.query.email
        console.log(email)
        let rendP = await User.findOne({ email })
        rendP.etatrend = "completed"
        rendP.save()
        res.status(200).send({ success: true ,rendP})
    } catch (err) {
        return res.status(404).send({ success: false, message: err })
    }
})

//afficher le rendez bou de medecin 

router.get('/medecin/:medecinId', async (req, res) => {
  try {
    const rendM = await Rend.find({ medecinID: req.params.medecinId }).populate("userID").populate("medecinID").exec();
    res.status(200).json(rendM);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
  });





// chercher un rendez-vous
router.get('/:rendId',async(req, res)=>{
try {
const red = await Rend.findById(req.params.rendId);
res.status(200).json(red);
} catch (error) {
res.status(404).json({ message: error.message });
}
});






router.post('/', async (req, res) => {
  const nouvrend = new Rend(req.body)
  try {
  await nouvrend.save();
  res.status(200).json(nouvrend);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
  });

//changer l'etat en accepter
  router.put('/accept/:rendID', async (req, res) => {

    const id = req.params.rendID;
    try {
        const red = {
          etatrend: "accepter", _id: id
        };
        await Rend.findByIdAndUpdate(id, red);
        res.json(red);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

//changer l'etat en refiser
router.put('/refuser/:rendID', async (req, res) => {

  const id = req.params.rendID;
  try {
      const red = {
        etatrend: "refuser", _id: id
      };
      await Rend.findByIdAndUpdate(id, red);
      res.json(red);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
})

router.put('/cancel/:rendID', async (req, res) => {

  const id = req.params.rendID;
  try {
      const red = {
        etatrend: "cancel", _id: id
      };
      await Rend.findByIdAndUpdate(id, red);
      res.json(red);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
})




router.put('/refuser/:rendID', async (req, res) => {

  const id = req.params.rendID;
  try {
      const red = {
        etatrend: "refuser", _id: id
      };
      await Rend.findByIdAndUpdate(id, red);
      res.json(red);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
})






// Supprimer un rendez-vous




router.delete('/:rendId', async (req, res)=> {
const id = req.params.rendId;
await Rend.findByIdAndDelete(id);
res.json({ message: "rendez-vous deleted successfully." });
});


module.exports = router;








