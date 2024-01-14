const router = require('express').Router();
const courseService = require('../services/courseServices');

router.get('/catalog', async (req, res) => {
    const courses = await courseService.getAll();
    res.render('courses/catalog', { courses });
});

router.get('/create', (req, res) => {
    res.render('courses/create');
});

router.post('/create', async (req, res) => {
    try {
        await courseService.create({ ...req.body, owner: req.user._id });
        res.redirect('/courses/catalog');
    } catch (error) {
        console.log(error);
        res.render('courses/create', { error: getErrorMessage(error) });
    }
});

function getErrorMessage(error) {
    const errorsArr = Object.keys(error.errors);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message;
    }
}

router.get('/details/:courseId', async (req, res) => {
    const { signUp } = req.query;

    if (signUp) {
        await enrollUser(req, res);
    }

    const course = await courseService.getOne(req.params.courseId);
    const courseData = course.toObject();
    const isUser = Boolean(req.user);
    const isOwner = courseData.owner == req.user?._id;
    const notEnrolled = !signUp && !courseData.signUpList.some(obj => obj.userId.toString() === req.user?._id);
    courseData.signUpList = course.getSignUpList();

    console.log(course.getSignUpList(), req.user?._id, notEnrolled);

    res.render('courses/details', { courseData, isUser, isOwner, notEnrolled });
});

async function enrollUser(req, res) {
    try {
        await courseService.enroll(req.params.courseId, req.user?._id, req.user.username);
    } catch (error) {
        res.render('courses/details', { error: error.message });
    }
}

async function checkIsOwner(req, res, next) {
    const courses = await courseService.getOne(req.params.courseId);

    if (courses.owner == req.user._id) {
        next();
    } else {
        res.redirect(`/courses/details/${req.params.courseId}`);
    }
}

router.get('/delete/:courseId', checkIsOwner, async (req, res) => {
    try {
        await courseService.delete(req.params.courseId);

        res.redirect('/courses/catalog');
    } catch (error) {
        res.render('courses/create', { error: getErrorMessage(error) });
    }
});

router.get('/edit/:courseId', checkIsOwner, async (req, res) => {
    const course = await courseService.getOne(req.params.courseId);

    res.render('courses/edit', { ...course.toObject() });
});

router.post('/edit/:courseId', checkIsOwner, async (req, res) => {
    try {
        await courseService.updateOne(req.params.courseId, req.body);

        res.redirect(`/courses/details/${req.params.courseId}`);
    } catch {
        res.render('courses/create', { error: getErrorMessage(error) });
    }
});

module.exports = router;
