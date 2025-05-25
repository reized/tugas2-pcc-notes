import express from 'express';
import { 
    getNote, 
    getNoteById,
    createNote,
    updateNote,
    deleteNote
} from '../controller/NoteController.js';

import {
    Register,
    Login,
    refreshToken,
    logout,
} from '../controller/UserController.js';

import { VerifyToken } from '../middleware/VerifyToken.js';

const router = express.Router();

// User Routes
router.post('/register', Register);
router.post('/login', Login);
router.post('/token', refreshToken);
router.delete('/logout', logout);

// Note Routes
router.get('/notes', getNote);
router.get('/notes/:id', getNoteById);
router.post('/notes/', createNote);
router.patch('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

router.all("*", (req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

export default router;