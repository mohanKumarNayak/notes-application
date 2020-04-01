const Category = require('../models/category')
const Note = require('../models/note')

module.exports.list = (req,res) => {
    const {user} = req
    Category.find({
        user : user._id
    })
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })

}

module.exports.create = (req,res) => {
    const data = req.body
    const {user} = req
    const category = new Category(data)
    category.user = user._id
    category.save()
        .then((category)=>{
            res.json(category)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    const {user} = req
    Promise.all([Category.findOne({
        _id:id,
        user : user._id
    }), Note.find({category : id,
    user : user._id})])
        .then((values)=>{
            const [category,notes] = values
            res.json({
                category,
                notes
            })
        })
        .catch((err)=>{
            res.josn(err)
        })

}

module.exports.update = (req,res) => {
    const data = req.body
    const id = req.params.id
    const {user} = req
    Category.findOneAndUpdate({
        _id : id,
        user : user._id
    },data,{new : true ,runValidators : true})
        .then((category)=>{
            if(category){
                res.json(category)
            }
            else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.destroy = (req,res) => {
    const id = req.params.id
    const {user} = req
    Category.findOneAndDelete({
        _id : id,
        user : user._id
    })
        .then((category)=>{
            if(category){
                res.json(category)
            }
            else{
                res.josn({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}