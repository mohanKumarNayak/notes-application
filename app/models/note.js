const mongoose = require('mongoose')
// const Category = require('./category')

// schema
const Schema = mongoose.Schema
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true 
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Category',
        // required :true
    },
    user : {
        type : Schema.Types.ObjectId,
        req : true,
        ref : 'User'
    }
})

//mongoose middleware
//pre('validate')
noteSchema.pre('save',function(next){
    console.log('function called before saving a record')
    next()
})

// model 
const Note = mongoose.model('Note', noteSchema)

module.exports = Note