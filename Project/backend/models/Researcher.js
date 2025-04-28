const mongoose = require('mongoose');

const researcherSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    nationality: String,
    phone: String,
    researcherId: String,
    university: String,
    registrationNo: String,
    linkedIn: String,
    scopusId: String,
    orcid: String,
    resume: String,
    photo: String
}, { collection: 'researchers' }); // ✅ Explicit collection name

module.exports = mongoose.model('Researcher', researcherSchema);
