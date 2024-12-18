import express from 'express';
import db from './db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(401).json({ message: "Unauthorized" });
};

router.delete("/account", isAuthenticated,  async (req, res) => {
    try {
        await db.query("DELETE FROM users WHERE id = $1", [req.user.id]);
        req.logout(error => {
            if (error) return res.status(500).json({ error: "Failed to log out" });
            res.status(200).json({ message: "Account is removed successfully!"});
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

router.post("/account/email", isAuthenticated, async (req, res) => {
    try { 
        const email = req.body.email;
        await db.query("UPDATE users SET email=$1 WHERE id=$2", [email, req.user.id]);
        res.status(200).json({ message: "Email is updated successfully!" });
    } catch (error) {
        res.status(500).json({ error});
    }
});

router.post("/acount/password", isAuthenticated,  async (req, res) => {
    try { 
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const result = await db.query("SELECT password FROM users WHERE id=$1", [req.user.id]);
        const hash = result.rows[0];
        const match = await bcrypt.compare(oldPassword, hash);

        if (match) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await db.query("UPDATE users SET password=$1 WHERE id=$2", [hashedPassword, req.user.id]);
            res.status(200).json({ message: "Password is updated successfully!" });
        } else {
            res.status(500).json({ error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
});

export default router;
