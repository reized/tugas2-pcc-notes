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
router.get('/notes', VerifyToken, getNote);
router.get('/notes/:id', VerifyToken, getNoteById);
router.post('/notes/', VerifyToken, createNote);
router.patch('/notes/:id', VerifyToken, updateNote);
router.delete('/notes/:id', VerifyToken, deleteNote);

router.all("*", (req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

export default router;