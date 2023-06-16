// const express = require('express');
// const dispo = require('../models/disponibilites');
// const disponibilites = require('../models/disponibilites');
// const router = express.Router();


// router.get('/', async (req, res, )=> {
//     try {
//     const dispo = await disponibilites.find();
//     res.status(200).json(dispo);
//     } catch (error) {
//     res.status(404).json({ message: error.message });
//     }
//     });


// // créer un nouvelle dispo
//     router.post('/', async (req, res) => {

//         const nouvdispo = new dispo(req.body)
//         try {
//             await nouvdispo.save();
//             res.status(200).json(nouvdispo);
//         } catch (error) {
//             res.status(404).json({ message: error.message });
//         }
//     });

    
// // afficher dispo de médecin
// router.get('/:medecinsId', async (req, res) => {
//     try {
//       const dispo1 = await disponibilites.find({ medecinID: req.params.medecinsId }).populate("medecinID").exec();
//       res.status(200).json(dispo1);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
// });

//     //edit medecin
// // router.get('/status/edit/', async (req, res) => {
// //     try {

// //         let email = req.query.email
// //         console.log(email)
// //         let user = await Medecin.findOne({ email })
// //         user.isActive = !user.isActive
// //         user.save()
// //         res.status(200).send({ success: true ,user})
// //     } catch (err) {
// //         return res.status(404).send({ success: false, message: err })
// //     }
// // })


// module.exports = router;
