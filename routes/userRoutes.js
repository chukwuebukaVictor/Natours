const express = require('express');
const {
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  updateMe,
  deleteMe,
  deleteUser,
  getMe,
} = require('../controllers/userController');
// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//Protect all route after this middleware
router.use(authController.protect)

router.patch(
  '/updateMyPassword',
  authController.updatePassword
);

router.get('/me',getMe, getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(authController.restrictTo('admin'))

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
