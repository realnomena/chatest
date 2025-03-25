const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Room', roomSchema);