const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Researcher = require('../models/Researcher');

router.get('/get-users', async (req, res) => {
    try {
        const students = await Student.find().select('firstName lastName email university photo').lean();
        const researchers = await Researcher.find().select('firstName lastName email university photo').lean();

        if (!students.length && !researchers.length) {
            return res.status(404).json({ message: "No users found" });
        }

        const users = [
            ...students.map(s => ({
                id: s._id,
                name: `${s.firstName} ${s.lastName}`,
                details: `Student at ${s.university}`,
                type: 'Student',
                photo: s.photo ? `/${s.photo}` : '/uploads/default.jpg',
            })),
            ...researchers.map(r => ({
                id: r._id,
                name: `${r.firstName} ${r.lastName}`,
                details: `Researcher at ${r.university}`,
                type: 'Researcher',
                photo: r.photo ? `/${r.photo}` : '/uploads/default.jpg',
            }))
        ];

        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;

