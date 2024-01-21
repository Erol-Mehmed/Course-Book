const router = require('express').Router();
const profileService = require("../services/profileService");

router.get('/', async (req, res) => {
  const userData = await profileService.getUserById(req.user._id);
  const createdCourses = await profileService.getCourseByUserId(req.user._id);
  const signUpCourses = await profileService.getSignUpCoursesByUserId(req.user._id);

  res.render('profile', { userData, createdCourses, signUpCourses});
});

module.exports = router;
