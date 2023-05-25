const express = require('express');
const Rend = require('../models/rend');
const router = express.Router();
const User = require('../models/user');
const nodemailer = require('nodemailer');
var sid  = "ACe0c3726ace9a2645f1d4250202070647";
var auth_token ="f87bcc631c1407c5d570a53ff74d1936";
var twilio = require("twilio")(sid,auth_token);
const { addDays } = require('date-fns');


// afficher la liste des rendez-vous
router.get('/', async (req, res, )=> {
try {
const rends = await Rend.find().populate("medecinID").populate("userID").exec();
res.status(200).json(rends);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

// const rends = await Rend.find({ "etatrend": "accepter"});



//afficher rendez vous patient  (historique rendez vous de maladie patientID : user.id connecter )
router.get('/user/:userId', async (req, res) => {
  try {
    const rendP = await Rend.find({ userID: req.params.userId}).populate("userID").populate("medecinID").exec();
    res.status(200).json(rendP);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
  });



  


//changer l'etat en accepter avec le medecin
//   router.put('/accept/:rendID', async (req, res) => {

//     const id = req.params.rendID;
//     try {
//         const red = {
//           etatrend: "accepter", _id: id
//         };
//         await Rend.findByIdAndUpdate(id, red);
//         res.json(red);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// })

/////
router.put('/accept/:rendID', async (req, res) => {
  const id = req.params.rendID;
  try {
    const red = {
      etatrend: "accepter",
      _id: id
    };

    // Mettre à jour l'état du rendez-vous en tant qu'accepté
    await Rend.findByIdAndUpdate(id, red);
    res.json(red);

    // Récupérer les informations sur le rendez-vous pour le SMS
    const rendezVous = await Rend.findById(id).populate("userID").exec();
    const rendezVousDate = new Date(rendezVous.Daterd).toLocaleDateString();
    const rendezVousTime = rendezVous.timerd;
   
   
       // Envoyer un SMS au patient pour l'informer de l'acceptation du rendez-vous

    // Envoyer un SMS au patient pour l'informer de l'acceptation du rendez-vous
    const messageBody = `Votre rendez-vous a été accepté.pour le  Date : ${rendezVousDate} à Heure : ${rendezVousTime}`;
    // const phoneNumber = rendezVous.userID.phone;

    try {
      await twilio.messages.create({
        from: '+12542804894',
        to: '+21621274227',
        body: messageBody
      });
      console.log('Message sent to', "+21621274227");
    } catch (error) {
      console.log('Error sending message to', "+21621274227", ':', error);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//////

//changer etat de rendez vous de user Avec sms
  
// router.get('/status/edit/', async (req, res) => {
//     try {

//         let email = req.query.email
//         console.log(email)
//         let rendP = await User.findOne({ email })
//         rendP.etatrend = "completed"
//         rendP.save()
//         res.status(200).send({ success: true ,rendP})
//     } catch (err) {
//         return res.status(404).send({ success: false, message: err })
//     }
// })

//afficher le rendez vous de medecin 

router.get('/medecin/:medecinId', async (req, res) => {
  try {
    const rendM = await Rend.find({ medecinID: req.params.medecinId }).populate("userID").populate("medecinID").exec();
    res.status(200).json(rendM);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
  });

//ajouter rdv
// router.post('/', async (req, res) => {
//   const nouvrend = new Rend(req.body)
//   try {
//   await nouvrend.save();
//   res.status(200).json(nouvrend);
//   } catch (error) {
//   res.status(404).json({ message: error.message });
//   }
//   });

router.post('/', async (req, res) => {
  const nouvrend = new Rend(req.body);
  try {
    // Vérification de la disponibilité
    const rendezVousExiste = await Rend.exists({
      medecinID: nouvrend.medecinID,
      Daterd: nouvrend.Daterd,
      timerd: nouvrend.timerd
    });
    if (rendezVousExiste) {
      // Le rendez-vous est déjà réservé
      return res.status(409).json({ message: 'Ce rendez-vous est déjà réservé.' });
     
    }

// Vérification de la limite de rendez-vous pour la journée
const rendezVousPourLaJournee = await Rend.countDocuments({
  medecinID: nouvrend.medecinID,
  Daterd: nouvrend.Daterd
});
if (rendezVousPourLaJournee > 10) {
  // La limite de rendez-vous pour la journée a été atteinte
  return res.status(409).json({ message: 'La limite de rendez-vous pour cette journée a été atteinte.' });
}

    // Le rendez-vous est disponible, on peut l'ajouter
    await nouvrend.save();
    const date = nouvrend.Daterd;
const time = nouvrend.timerd;
const messageBody = `DrMedical, votre Rendez_Vous créé avec succès pour le  ${date} à ${time} , Attendez la réponse de médecin. `;

    // const lienRendezVous = `https://votre-site.com/accept/${nouvrend._id}`;
    // const lienRendezVous = `http://localhost:3001/api/rends/accept/${nouvrend._id}`;

   // Envoi du SMS avec le lien
   twilio.messages.create({
    from: "+12542804894",
    to: "+21621274227",
    body: messageBody

    // body: `You have successfully scheduled an appointment. Click the link to accept: ${lienRendezVous}`

  }).then((message) => {
    console.log('Message sent:', message.sid);
  }).catch((err) => {
    console.log(err);
  });
  //fin

    res.status(200).json(nouvrend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/raporter/:rendID', async (req, res) => {
  const id = req.params.rendID;
  // const { newDate, newTime } = req.body; // Assuming the new date and time are provided in the request body
  const { Daterd, timerd } = req.body;  

  try {
     const rendezVous = await Rend.findById(id).populate("userID").exec();

    // Check if the chosen date is already reserved
    const isDateReserved = await Rend.exists({ Daterd,timerd, etatrend: { $ne: "A rapporter" } });
    if (isDateReserved) {
      return res.status(400).json({ message: 'The chosen date is already reserved.' });
    }

   
    const red = {
      etatrend:"A rapporter",
      Daterd: Daterd, // Update the date
      timerd: timerd, // Update the time
      _id: id
    };

    // Mettre à jour l'état du rendez-vous en tant qu'accepté
    await Rend.findByIdAndUpdate(id, red);
    res.json(red);


    // Récupérer les informations sur le rendez-vous pour le SMS
//     const rendezVous = await Rend.findById(id).populate("userID").exec();

//  // Formatage de la date et de l'heure du rendez-vous
//  const rendezVousDate = new Date(rendezVous.Daterd).toLocaleDateString();
//  const rendezVousTime = rendezVous.timerd;


    // Envoyer un SMS au patient pour l'informer de l'acceptation du rendez-vous
 const messageBody = ` Votre rendez-vous a été rapporté a une autre Date: ${Daterd} à Heure : ${timerd}`;
   
 ///// const phoneNumber = rendezVous.userID.phone;

    try {
      await twilio.messages.create({
        from: '+12542804894',
        to: '+21621274227',
        body: messageBody
      });
      console.log('Message sent to', "+21621274227");
    } catch (error) {
      console.log('Error sending message to', "+21621274227", ':', error);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


//patient cancel rdv 
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




router.put('/raporter/:rendID', async (req, res) => {

  const id = req.params.rendID;
  try {
      const red = {
        etatrend: "A rapporter", _id: id
      };
      await Rend.findByIdAndUpdate(id, red);
      res.json(red);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
})

router.get('/accepted', async (req, res,) => {
  try {
      const rends = await Rend.find({ "etatrend": "accepter"});
      res.status(200).json(rends);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});

router.get('/medecin/:medecinId/accepter', async (req, res) => {
  try {
    const rendM = await Rend.find({ medecinID: req.params.medecinId ,  $or: [{ etatrend: "accepter" },
      { etatrend: "contrôle" }]}).populate("userID").populate("medecinID").exec();
    res.status(200).json(rendM);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
  });

// Supprimer un rendez-vous
router.delete('/:rendId', async (req, res)=> {
const id = req.params.rendId;
await Rend.findByIdAndDelete(id);
res.json({ message: "rendez-vous deleted successfully." });
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





// Route pour envoyer un SMS de rappel au patient un jour avant le rendez-vous
router.post('/reminder/:rendID', async (req, res) => {
  const id = req.params.rendID;
  try {
    // Récupérer les informations sur le rendez-vous
    const rendezVous = await Rend.findById(id).populate("userID").exec();

    // Vérifier si le rendez-vous est accepté
    if (rendezVous.etatrend === "accepter") {
      // Obtenir la date du rendez-vous
      const rendezVousDate = new Date(rendezVous.Daterd);

      // Calculer la date du rappel (un jour avant le rendez-vous)
      const reminderDate = addDays(rendezVousDate, -1);

      // Créer le message de rappel avec la date et l'heure du rendez-vous
      const messageBody = `Rappel : Vous avez un rendez-vous demain. Date : ${rendezVousDate.toLocaleDateString()}, Heure : ${rendezVous.timerd}`;

      // Envoyer le SMS de rappel
      await twilio.messages.create({
        from: '+12542804894',
        to: '+21621274227',
        body: messageBody
      });

      res.status(200).json({ message: 'SMS de rappel envoyé avec succès.' });
    } else {
      res.status(400).json({ message: "Le rendez-vous n'est pas accepté." });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});





router.get('/accepted/users/:userId', async (req, res) => {
  try {
    const rendP = await Rend.find({ userID: req.params.userId ,"etatrend": "accepter"}).populate("userID").populate("medecinID").exec();
    res.status(200).json(rendP);
  } catch (error) {
  res.status(404).json({ message: error.message });
  }
  });





// router.put('/acceptesms/:rendID', async (req, res) => {
//   try {
//     const id = req.params.rendID;
     
//     const updateRend = await Rend.findOneAndUpdate(
//       { _id: id },
//       { etatrend: "completer" }
//     ).exec();
//     res.json(updateRend);

//     twilio.messages.create({
//       from: "+12542804894",
//       to: "+21621274227",
//       body: "Your appointment has been completed."
//     }).then((message) => {
//       console.log('Message sent:', message.sid);
//     }).catch((err) => {
//       console.log(err);
//     });
//   } catch (error) {
//     console.log("An error occurred:", error);
//     res.status(500).json({ success: false, error: "Internal Server Error" });
//   }
// });







module.exports = router;





