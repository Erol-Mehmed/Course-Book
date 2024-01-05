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
        validate: /^https?:\/\//i
    },
    certificate: {
        type: Number,
        required: true,
        minValue: 0,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
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
    return this.signUpList.map(x => x._id);
});

let Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;
