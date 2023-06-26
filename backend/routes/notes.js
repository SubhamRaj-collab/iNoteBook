const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//Route1: Get all the notes using: GET "/api/notes/fetchAllNotes". Login Required.
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    
    try {
    
        const notes = await Note.find({user: req.user.id});
        res.json(notes);    

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

//Route2: Add a new note using: POST "/api/notes/addNote". Login Required.
router.post('/addNote', fetchUser,
[
    body('title', 'Enter a valid title: ').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 Characters').isLength({ min: 5 })
], async (req, res) => {

    try {
        
        const {title, description, tag} = req.body;

        //If there are errors, return bad request and the errors.
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote);

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route3: Update an existing note using: PUT "/api/notes/updateNote/:id". Login Required.
router.put('/updateNote/:id', fetchUser, async (req, res) => {

    const {title, description, tag} = req.body;

    try
    {
        //Create a newNote object
        
        const newNote = {};

        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //Find the note to be updated and update it.

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})

        res.json({note});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

//Route4: Delete an existing note using: DELETE "/api/notes/deleteNote/:id". Login Required.
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

    try {
     
        //Find the note to be deleted and delete it.

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not Found");
        }

        //Allow deletion of note only if user owns this note.
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)

        res.json({"Success": "Note has been deleted", note: note});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router