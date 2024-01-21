const mongoose = require('mongoose');

let coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
    },
    type: {
        type: String,
        required: true,
        minLength: 3,
    },
    certificate: {
        type: String,
        required: true,
        minLength: 2,
    },
    image: {
        type: String,
        required: true,
        validate: /^https?:\/\//i
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    signUpList: [
        {
            userId: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            }
        }
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
