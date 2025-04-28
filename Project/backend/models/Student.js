const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    nationality: String,
    phone: String,
    university: String,
    registrationNo: String,
    resume: String,
    photo: String
}, { collection: 'students' }); // ✅ Explicit collection name

module.exports = mongoose.model('Student', studentSchema);
