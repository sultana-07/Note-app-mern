const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
        enum: ['work', 'personal', 'study', 'other'],
    },
    trashNote : {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;