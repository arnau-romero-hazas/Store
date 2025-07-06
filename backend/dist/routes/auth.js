"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// Clave secreta para firmar el token (en producción debe ir en .env)
const JWT_SECRET = 'supersecreto-bollipan';
// Ruta POST /api/auth/login
router.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Username requerido' });
    }
    const user = { username };
    // Creamos el token JWT
    const token = jsonwebtoken_1.default.sign(user, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ user, token });
});
exports.default = router;
