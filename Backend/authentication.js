import express from 'express';

const router = express.Router();

router.post("/login", (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Sucessfully logged in"})
});

router.post("/register", (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Sucessfully registered"})
});

router.post("/logout", (req, res) => {
    console.log("logging out")
    res.status(200).json({ message: "Sucessfully logged out"})
});

export default router;