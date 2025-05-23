// const note = require('../models/note.models');
const { validationResult } = require('express-validator');
const Note = require('../models/note.models');


const { createNote,createTrashNote } = require('../services/create.service');

module.exports.createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user.id; // Assuming you have authentication middleware that adds user to req
    const { title, content,category } = req.body;
   
    

    try {
        const note = await createNote( userId, title, content,category);
        return res.status(201).json(note);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getAllNotes = async (req, res) => {
    try {
        // Get user ID from authenticated request
        const userId = req.user.id; // Assuming you have authentication middleware that adds user to req

     

        // Find all notes that belong to the user
        const notes = await Note.find({ userId: userId, trashNote: false });
        
        if (!notes) {
            return res.status(404).json({ message: "No notes found for this user" });
        }

        return res.status(200).json(notes.reverse());
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.deleteNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id; // Assuming you have authentication middleware that adds user to req

    try {
        const findNote = await Note.findByIdAndUpdate(noteId, { trashNote: true }, { new: true });

       
        
        if (!findNote) {
            return res.status(404).json({ message: "Note not found" });
        }
      
       
        return res.status(200).json({ message: "Note deleted successfully" });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id; // Assuming you have authentication middleware that adds user to req

    try {
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json(note);
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.updateNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id; // Assuming you have authentication middleware that adds user to req
    const { title, content, category } = req.body;

    try {
        const note = await Note.findByIdAndUpdate(noteId, { title, content, category }, { new: true });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json(note);
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getTrashNotes = async (req, res) => {
    try {
        // Get user ID from authenticated request
        const userId = req.user.id; // Assuming you have authentication middleware that adds user to req

     

        // Find all notes that belong to the user
        const notes = await Note.find({ userId: userId, trashNote: true });
        
        if (!notes) {
            return res.status(404).json({ message: "No notes found for this user" });
        }

        return res.status(200).json(notes.reverse());
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.deleteTrashNote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user.id; // Assuming you have authentication middleware that adds user to req

    try {
        const findNote = await Note.findByIdAndDelete(noteId);
        if (!findNote) {
            return res.status(404).json({ message: "Note not found" });
        }
      
      
      
        return res.status(200).json({ message: "Note deleted successfully" });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.restoreTrashNote = async (req, res) => {
    const noteId = req.params.id;
  

    try {
        const findNote = await Note.findByIdAndUpdate(noteId, { trashNote: false }, { new: true });

      
       
        
        if (!findNote) {
            return res.status(404).json({ message: "Note not found" });
        }
      
       
        return res.status(200).json({ message: "Note restore successfully" });
    }catch (error) {
        return res.status(500).json({ error: error.message });
    }
}