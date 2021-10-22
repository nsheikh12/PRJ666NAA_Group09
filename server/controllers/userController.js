const express = require('express')
const router = express.Router()

const User = require('../models/userModel')

const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');


const signToken = userID => {
    return JWT.sign({
        iss: "Isabella",
        sub: userID
    }, "Isabella", { expiresIn: "1h" });
}

// Create one   --->register<--                                                                   ////// updated
router.post('/register', (req, res) => {
    console.log("inside register router")

    const { lastName, firstName, id, email, userName, password, isAdmin, isFaculty } = req.body;
    console.log(userName);
    User.findOne({userName}, (err, user) => {
        if (err) {
            res.status(500).json({ message: { msgBody: "Error 1 has occured", msgError: true } });
        }
        if (user) {
            console.log("sth. wrong here")
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        } else {
            const newUser = new User({
                lastName,
                firstName,
                id,
                email,
                userName,
                password,
                isAdmin,
                isFaculty
            });
            newUser.save(err => {
                if (err) {
                    res.status(500).json({ message: { msgBody: "Error 2 has occured", msgError: true } });
                } else {
                    res.status(201).json({ message: { msgBody: "Account successfully created!", msgError: false } });
                }
            })
        }
    });
});

// login                                                                                    ///////////////==> for login  <== 
router.post('/login', passport.authenticate('local', {session : false}), (req,res)=>{
    console.log("inside login post")
    if(req.isAuthenticated()){
        const {_id, userName, isAdmin} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {userName, isAdmin}});
    }
});

// logout                                                                           ////////==> for logout <===/////
router.get('/logout', passport.authenticate('jwt', {session : false}), (req, res)=>{
    res.clearCookie('access_token');
    res.json({user: {userName : ""}, success: true});
})

router.get('/admin', passport.authenticate('jwt', {session : false}), (req, res)=>{      ////// not sure if it works yet //////
    if(req.user.isAdmin){
        console.log("inside redirect managementconsole")
        res.status(200).json({message: {msgBody : "You are an admin",msgError: false}, isAdmin: true}); /// not working, not sure why /// 
    } else{
        res.status(403).json({message: {msgBody : "You are not an admin, go away", msgError: true}});
    }
})
router.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res)=>{
    console.log(req.user);
    const { userName, isAdmin } = req.user;
    res.status(200).json({isAuthenticated: true,user: {userName, isAdmin}});
})






// Get all
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})


// Update one
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.lastName != null) {
        res.user.lastName = req.body.lastName
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted user' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.user = user
    next()
}

module.exports = router