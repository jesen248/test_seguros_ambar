const {Router, json} = require('express');
const router = Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User');


router.get('/', (req, res) => res.send('Hello Wordl'))

router.post('/signup', async(req, res) => {
    const { email, password } = req.body;
    const newUser = new User({email, password});
    await newUser.save();
 


    const token = jwt.sign({ _id:newUser  }, 'secretkey ')

    res.status(200).json({token});
})

router.post('/signin', async (req, res) =>{

    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(401).send("The email doesn't exists");
    if (user.password !== password) return res.status(401).send("wrond Password");

    const token = jwt.sign({_id: user._id}, 'secretkey');
    console.log(req.headers.authorization);

    return res.status(200).json({token});
});

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('anuthorized Request')
    }

    const token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('anuthorized Request')
    }

    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload._id;
    next();
}

router.get('/profile', verifyToken, (req, res) => {
    res.send(req.userId)
})

module.exports = router;