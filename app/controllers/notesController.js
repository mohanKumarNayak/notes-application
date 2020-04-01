const Note = require('../models/note')

module.exports.list = (req, res) => {
    const {user} = req
    Note.find({
        user : user._id
    }).populate('category')
        .then((notes) => {
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    const {user} = req
    Note.findOne({
        _id : id,
        user : user._id
    }).populate('category')
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req, res) => {
    const body = req.body
    const {user} = req
    const note = new Note(body)
    note.user = user._id
    note.save()
        .then((note) => {
            res.json({
                notice: 'successfully created a note', 
                note
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.update = (req, res) => {
    const id = req.params.id
    const {user} = req
    const body = req.body
    Note.findOneAndUpdate({
        _id : id,
        user : user._id
    }, body, { new: true, runValidators: true })
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    const {user} = req
    Note.findOneAndDelete({
        _id : id,
        user : user._id
    })
        .then((note) => {
            if (note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

