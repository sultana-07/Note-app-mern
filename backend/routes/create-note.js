const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {body} = require('express-validator');
const  noteController = require('../controllers/note.controller');

router.post("/add",
    [
         body('title').notEmpty().withMessage('Title is required'),
         body('content').notEmpty().withMessage('Content is required'),
         body('category').notEmpty().withMessage('Category is required'),

    ],

     authMiddleware.authUser,
    noteController.createNote
     

 )

 router.put("/update/:id", authMiddleware.authUser, noteController.updateNote);

 router.put("/delete/:id", authMiddleware.authUser, noteController.deleteNote);

 router.get("/get/:id", authMiddleware.authUser, noteController.getNote);

  // Get all notes for a user

router.get("/getall",  authMiddleware.authUser, noteController.getAllNotes);

router.get("/gettrash", authMiddleware.authUser, noteController.getTrashNotes);
router.delete("/gettrash/:id", authMiddleware.authUser, noteController.deleteTrashNote);
router.put("/restore/:id", authMiddleware.authUser, noteController.restoreTrashNote);

 module.exports = router;