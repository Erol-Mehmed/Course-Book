const mongoose = require('mongoose');

let coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 4,
    },
    type: {
        type: String,
        required: true,
    },
    certificate: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    signUpList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

coursesSchema.method('getSignUpList', function () {
    return this.signUpList.map(x => x);
});

const Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;
