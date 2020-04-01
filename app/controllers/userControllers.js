const User = require('../models/user')

module.exports.register = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user)=>{
            res.json(user)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.login = (req,res) => {
    const body = req.body
    User.findByCredentials(body.email,body.password)
        .then((user)=>{
            return user.genToken()
        })
            .then((token)=>{
                 res.json({
                "token" : token
            })
         })
             .catch((err)=>{
                res.json(err)
        })
}

module.exports.account = (req,res) => {
    const {user} = req
    User.findOne({
        _id : user._id
    })
        .then((user)=>{
            res.json({
                _id : user._id,
                username : user.username,
                email : user.email
            })
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.logout = (req,res) => {
    const {user,token} = req
    User.findOneAndUpdate({
        _id : user._id
    },{$pull : {tokens : {token : token}}})
        .then((user)=>{
            res.json({
                "notice" : "logout successfully"
            })
        })
        .catch((err)=>{
            res.json(err)
        })
}