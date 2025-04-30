const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    bio: {
        type: String,
        default: ''
    },
    profilePic: {
        type: String,
        default: ''
    },
    resumeUrl: {
        type: String,
        default: ''
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

const User = mongoose.model('User', userSchema);

module.exports = User;
