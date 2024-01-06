const router = require('express').Router();
const courseService = require('../services/courseServices');

router.get('/catalog', async (req, res) => {
    let courses = await courseService.getAll();
    res.render('courses/catalog', { courses });
});

router.get('/create', (req, res) => {
    res.render('courses/create')
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
    let errorsArr = Object.keys(error.errors);

    if (errorsArr.length > 0) {
        return error.errors[errorsArr[0]];
    } else {
        return error.message
    }
}

router.get('/details/:courseId', async (req, res) => {

    let course = await courseService.getOne(req.params.courseId);
    let courseData = await course.toObject();

    let isOwner = courseData.owner == req.user?._id;
    let buyer = course.getBuyers();
    let isBought = req.user && buyer.some(c => c._id == req.user?._id);

    res.render('courses/details', { ...courseData, isOwner, isBought });
});

async function isOwner(req, res, next) {
    let courses = await courseService.getOne(req.params.courseId);

    if (courses.owner == req.user._id) {
        res.redirect(`/courses/details/${req.params.courseId}`);
    } else {
        next();
    }
}

router.get('/buy/:courseId', isOwner, async (req, res) => {
    let courses = await courseService.getOne(req.params.courseId);

    courses.buyer.push(req.user._id);
    await courses.save();

    res.redirect(`/courses/details/${req.params.courseId}`);

});

async function checkIsOwner(req, res, next) {
    let courses = await courseService.getOne(req.params.courseId);

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
    let course = await courseService.getOne(req.params.courseId);

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