const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
// const Medecin = require('../models/medecin.js');
const specialite = require('../models/specialite.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { uploadFile } = require("../middleware/uploadFile");

var transporter = nodemailer.createTransport({
    service: 'gmail',

    auth:{
        user:'rahmaa.hamza.2001@gmail.com',
        pass:'szpluqqcsmtbbqwa'
      },
    tls: {
        rejectUnauthorized: false
    }
})
 require('dotenv').config()

//affichier liste des utilisateur 
router.get('/', async (req, res,) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// router.get('/doctor', async (req, res) => {
//     try {
//         console.log(req.query)
//         const users = await User.find({role: req.query.role == "doctor"})
//         return res.status(200).send(users)
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });
//affichier liste des medecins par specialité

router.get('/doctors', async (req, res) => {
    try {
        console.log(req.query)
        
        const users = await User.find({role: req.query.role , accountStatus :"accepter" }).populate('specialiteID').exec()
        return res.status(200).send(users.filter(user => user?.specialiteID?.nomsep === req.query.specialite))
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// créer un nouvel user
// uploadFile.fields([{ name: 'matricule' }, { name: 'avatar' }]),
//   // Ajouter le code pour gérer les fichiers téléchargés
//   if (req.files && req.files['matricule'] && req.files['avatar']) {
//     const photo1FileName = req.files['matricule'][0].filename;
//     const photo2FileName = req.files['avatar'][0].filename;
//     console.log("matricule:", photo1FileName);
//     console.log("avatar :", photo2FileName);
//     // Faites ici ce que vous souhaitez faire avec les photos, par exemple, les enregistrer dans la base de données, etc.
//   }

router.post('/register',   async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) return res.status(404).send({ success: false, message: "User already exists" })
    console.log(req.body)



    const nouvuser = new User(req.body)

    try {
        await nouvuser.save();
   // Envoyer l'e-mail de confirmation de l'inscription
   var mailOption = {
    from: '"verify your email " <rahmaa.hamza.2001@gmail.com>',
    to: nouvuser.email,
    subject: 'vérification your email ',
    html: `<h2>${nouvuser.firstName}! thank you for registreting on our website</h2>
<h4>please verify your email to procced.. </h4>
<a href="http://${req.headers.host}/api/users/status/edit?email=${nouvuser.email}">click here</a>`
}
transporter.sendMail(mailOption, function (error, info) {
    if (error) {
        console.log(error)
    }
    else {
        console.log('verification email sent to your gmail account ')
    }
})


        res.status(200).json(nouvuser);
        // return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// chercher un user
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


router.put('/:userId', async (req, res) => {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body; // Les nouvelles données du compte utilisateur
  
      // Mettre à jour le compte utilisateur dans la base de données
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData);
  
      // Répondre avec les données du compte utilisateur mis à jour
      res.json(updatedUser);
    } catch (error) {
      // Gérer les erreurs
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la modification du compte utilisateur.' });
    }
  });

// modifier un user
// router.put('/:userId', async (req, res) => {
//     const { email, password, firstName, lastName } = req.body;

//     const id = req.params.userId;
//     try {
//         const user1 = {
//             email: email, lastName: lastName, firstName: firstName, password: password, _id: id
//         };
//         await User.findByIdAndUpdate(id, user1);
//         res.json(user1);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// });


// Supprimer un user
router.delete('/:userId', async (req, res) => {
    const id = req.params.userId;
    await User.findByIdAndDelete(id);
    res.json({ message: "user deleted successfully." });
});

router.post('/', async (req, res) => {
    const nouvuser = new User(req.body)
    try {
    await nouvuser.save();
    res.status(200).json(nouvuser);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

// register un nouvel utilisateur
// router.post('/', uploadFile.single("avatar"), async (req, res) => {
//     try {

//         let { email, password, firstName, lastName,phone } = req.body
//         const avatar = req.file.filename
//         const user = await User.findOne({ email })
//         if (user) return res.status(404).send({ success: false, message: "User already exists" })

//         const newUser = new User({ email, password, firstName, lastName,phone, avatar })

//         const createdUser = await newUser.save()

//         // Envoyer l'e-mail de confirmation de l'inscription
//         /*
//         var mailOption = {
//             from: '"verify your email " <rahmaa.hamza.2001@gmail.com>',
//             to: newUser.email,
//             subject: 'vérification your email ',
//             html: `<h2>${newUser.firstName}! thank you for registreting on our website</h2>
//         <h4>please verify your email to procced.. </h4>
//         <a href="http://${req.headers.host}/api/users/status/edit?email=${newUser.email}">click here</a>`
//         }
//         transporter.sendMail(mailOption, function (error, info) {
//             if (error) {
//                 console.log(error)
//             }
//             else {
//                 console.log('verification email sent to your gmail account ')
//             }
//         })
//         // const url =`http://localhost:3000/activate/${token}`;


//         */
//         return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })

//     } catch (err) {
//         console.log(err)
//         res.status(404).send({ success: false, message: err })

//     }

// });
//edit user


router.get('/status/edit/', async (req, res) => {
    try {

        let email = req.query.email
        console.log(email)
        let user = await User.findOne({ email })
        user.isActive = !user.isActive
        user.save()
        res.status(200).send({ success: true ,user})
    } catch (err) {
        return res.status(404).send({ success: false, message: err })
    }
})

//login d'utilisateur se connecter
router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({ success: false, message: "All fields are required" })
        }
        let user = await User.findOne({
            email
        }).populate('specialiteID')
        if (!user) {
            return res.status(404).send({ success: false, message: "Account doesn't exists" })
        } else {
            let isCorrectPassword = await bcrypt.compare(password, user.password)
            if (isCorrectPassword) {
                if (user.accountStatus !== 'accepter') {
                    return res.status(403).send({ success: false, message: "Your account is not accepted" })
                 }
                delete user._doc.password
                if (!user.isActive) return res.status(200).send({
                    success:
                        false, message: 'Your account is inactive, Please contact your administrator'
                })
                const token = generateAccessToken(user);
const refreshToken = generateRefreshToken(user);

                // const token = jwt.sign({
                //     iduser: user._id, 
                //     role: user.role,
                //      firstName: user.firstName, 
                //      lastName: user.lastName ,
                //      phone: user.phone ,
                //      email: user.email },
                //     process.env.SECRET, { expiresIn: "1h", })
                return res.status(200).send({ success: true, user ,token,refreshToken })
            } else {
                return res.status(404).send({
                    success: false, message:
                        "Please verify your credentials"
                })
            }
        }
    } catch (err) {
        return res.status(404).send({
            success: false, message: err.message
        })
    }
});
//Access Token
const generateAccessToken=(user) =>{
    return jwt.sign ({ iduser: user._id, role: user.role },
    process.env.SECRET, { expiresIn: '60s'})
    }

    // Refresh
function generateRefreshToken(user) {
    return jwt.sign ({ iduser: user._id, role: user.role },
    process.env.REFRESH, { expiresIn: '1y'})
    }


//Refresh Route
router.post('/refreshToken', async (req, res, )=> {
    console.log(req.body.refreshToken)
    const refreshtoken = req.body.refreshToken;
    if (!refreshtoken) {
    return res.status(404).send({success: false, message: 'Token Not Found'
    });
    }
    else {
    jwt.verify(refreshtoken, process.env.REFRESH, (err, user)=> {
    if (err) { console.log(err)
    return res.status(406).send({ success: false,message:
    'Unauthorized' });
    }
    else {
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    console.log("token-------",token);
    res.status(200).send({success: true,
    token,
    refreshToken
    })
    }
    });
    }
    });




router.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });

});



// router.get('/alluser', async (req, res, )=> {
//     try {
//     const users = await User.find({role:"user"});
//     res.status(200).json(users);
//     } catch (error) {
//     res.status(404).json({ message: error.message });
//     }
//     });


module.exports = router;