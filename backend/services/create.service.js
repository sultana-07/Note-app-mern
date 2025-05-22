const Note = require('../models/note.models');


module.exports.createNote = (userId, title, content,category) => {
    if(!title || !content || !userId || !category) {
        throw new Error('All fields are require are required');
    }

    const note =  Note.create({
        userId  :  userId,
        title,
        content,
        category,
        createdAt: Date.now(),
    });

    return note;
}

