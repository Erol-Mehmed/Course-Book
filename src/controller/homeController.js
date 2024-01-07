const router = require('express').Router();
const courseService = require('../services/courseServices');

router.get('/', async (req, res) => {
    const lastThreeCourses = await courseService.getLastThreeCourses();
    console.log('last three:', lastThreeCourses);
    res.render('home', { lastThreeCourses });
});

module.exports = router;
